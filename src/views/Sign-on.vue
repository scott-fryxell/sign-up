<template>
  <section id="sign-on" class="page">
    <mobile-as-form
      v-if="person && !nameless"
      v-model:person="person"
      @signed-on="signed_on" />
    <name-as-form v-if="nameless" v-model:person="person" @valid="new_person" />
  </section>
</template>
<script>
  import firebase from 'firebase/app'
  import 'firebase/auth'
  import mobile_as_form from '@/components/profile/as-form-mobile'
  import name_as_form from '@/components/profile/as-form-name'
  import signed_on from '@/mixins/signed_in'
  export default {
    components: {
      'mobile-as-form': mobile_as_form,
      'name-as-form': name_as_form
    },
    mixins: [signed_on],
    data() {
      return {
        nameless: false,
        person: null
      }
    },
    async created() {
      console.info('views:Sign-on')
      firebase.auth().onAuthStateChanged(this.auth_state)
    },
    methods: {
      auth_state(user) {
        if (user) this.person.mobile = null
      },
      async signed_on() {
        this.nameless = true
      }
    }
  }
</script>
<style lang="stylus">
  section#sign-on.page
    display: flex
    flex-direction: column
    justify-content: space-between
    figure.profile
      align-items: center
      & > svg
        border-radius: base-line * 2
        width: base-line * 2
        height: base-line * 2
        border-color: red
      & > figcaption
        padding: 0 0 0 round((base-line / 4 ), 2)
    svg.background
      fill: red
    form
    footer
      padding: base-line
      padding-top: 0
    & > footer > button
      opacity: 0.5
      &:hover
        opacity: 1
    @media (min-width: pad-begins)
      form
        align-self: center
</style>
