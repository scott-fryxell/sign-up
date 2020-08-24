import { shallow } from 'vue-test-utils'
import Sign_on from '@/views/Sign-on'
describe('@/views/Sign-on.vue', () => {
  it('Renders a form for signing on to the app', () => {
    localStorage.me = '/+6282281823'
    const wrapper = shallow(Sign_on)
    expect(wrapper.element).toMatchSnapshot()
  })
})
