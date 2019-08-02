// const a_year_ago = new Date().getFullYear() - 1
const a_year_ago = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
const format_as_time = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
}
const format_as_day = {
  weekday: 'long',
  day: 'numeric',
  month: 'long'
}
const format_as_day_and_year = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}
const format_as_day_and_time = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
}
export default {
  data() {
    return {
      sort_count: 0,
      thirteen_minutes: 1000 * 60 * 13,
      today: this.created_day(new Date().toISOString()),
      chronological: false,
      days: new Map()
    }
  },
  methods: {
    posts_into_days() {
      this.posts = this.condense_posts()
      this.posts.forEach(this.insert_post_into_day)
    },
    insert_post_into_day(post) {
      this.sort_count++
      const day_name = this.created_day(post.created_at)
      const day = this.days.get(day_name)
      if (day) {
        // TODO: play around with what's the fastest sorting unshift or push etc
        if (this.chronological || day === this.today) {
          day.push(post)
          day.sort(this.newer_first)
        }
        else {
          day.unshift(post)
          day.sort(this.older_first)
        }
      } else {
        this.days.set(day_name, [post])
      }
    },
    add_person_to_post(person, post) {
      post.person = person
      if (!post.muted) {
        const current = person.oldest_post
        const maybe = post.created_at
        if (!current || maybe < current) person.oldest_post = maybe
      }
    },
    condense_posts() {
      this.posts.sort(this.later_first)
      const condensed_posts = []
      while (this.posts.length > 0) {
        const post = this.posts.shift()
        post.statements = []
        while (this.is_train_of_thought(post)) {
          const next_statement = this.posts.shift()
          post.statements.unshift(next_statement)
        }
        condensed_posts.push(post)
      }
      return condensed_posts
    },
    is_train_of_thought(post) {
      this.sort_count++
      const next_post = this.posts[0]
      if (next_post && next_post.person.id === post.person.id) {
        let last_post = post
        // console.log('last_post', last_post);
        if (post.statements.length > 0) last_post = post.statements[0]
        const difference = Date.parse(next_post.created_at) - Date.parse(last_post.created_at)
        // console.log(this.thirteen_minutes, difference, (difference < this.thirteen_minutes));
        if (difference < this.thirteen_minutes) return true
        else return false
      } else return false
    },
    newer_first(earlier, later) {
      this.sort_count++
      return Date.parse(earlier.created_at) - Date.parse(later.created_at)
    },
    older_first(earlier, later) {
      this.sort_count++
      return Date.parse(later.created_at) - Date.parse(earlier.created_at)
    },
    created_time(created_at, format = format_as_time) {
      const time = new Date(created_at)
      return time.toLocaleString('en-US', format) // TODO: get country code from browser
    },
    created_day(created_at) {
      let day
      if (created_at < a_year_ago) day = this.created_time(created_at, format_as_day)
      else day = this.created_time(created_at, format_as_day_and_year)
      const today = this.created_time(new Date().toISOString(), format_as_day)
      if (day === today) day = `Today – ${day}`
      return day
    },
    created_day_and_time(created_at) {
      return this.created_time(created_at, format_as_day_and_time)
    }
  }
}
