export default {
  data() {
    return {
      sort_count: 0,
      thirteen_minutes: 1000 * 60 * 13
    }
  },
  methods: {
    posts_into_days(posts) {
      console.time('feed-into-days')
      const days = new Map()
      posts.forEach(post => {
        const created_time = new Date(post.created_at)
        const format = {weekday:'long', day:'numeric', month:'long'}
        const today = "Today"
        let day = created_time.toLocaleString('en-US', format)
        if (created_time.toDateString()  === (new Date()).toDateString() ) {
          day = `${today} – ${day}`
        }
        if (days.has(day)) {
          if (day === today) {
            days.get(today).push(post)
          } else {
            days.get(day).unshift(post)
          }
        } else {
          days.set(day, [post])
        }
      })
      console.timeEnd('feed-into-days')
      return days
    },
    condense_posts(feed) {
      console.time('condense-feed')
      const condensed_feed = []
      while(feed.length > 0) {
        let post = feed.shift()
        post.statements = []
        while(this.is_train_of_thought(post, feed)) {
          const next_statement = feed.shift()
          post.statements.unshift(next_statement)
        }
        condensed_feed.push(post)
      }
      console.timeEnd('condense-feed')
      return condensed_feed
    },
    is_train_of_thought(post, feed) {
      this.sort_count++
      const next_post = feed[0]
      if (next_post && next_post.person.id === post.person.id) {
        let last_post = post
        if (post.statements.length > 0) {
          last_post = post.statements[0]
        }
        let difference = Date.parse(last_post.created_at) - Date.parse(next_post.created_at)
        if (difference < this.thirteen_minutes) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    earlier_first(earlier, later) {
      this.sort_count++
      return Date.parse(earlier.created_at) - Date.parse(later.created_at)
    },
    later_first(earlier, later) {
      this.sort_count++
      return Date.parse(later.created_at) - Date.parse(earlier.created_at)
    },
    created_time(created_at) {
      const time = new Date(created_at)
      const format = { hour: 'numeric', minute: 'numeric', hour12: true }
      return time.toLocaleString('en-US', format)
    }
  }
}
