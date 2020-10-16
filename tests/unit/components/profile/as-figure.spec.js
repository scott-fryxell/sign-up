import { shallow, createLocalVue } from 'vue-test-utils'
import VueRouter from 'vue-router'
import { get } from 'idb-keyval'
import as_figure from '@/components/profile/as-figure'
const fs = require('fs')
const avatar_mock = fs.readFileSync('./tests/unit/html/avatar.html', 'utf8')
describe('@/compontent/profile/as-figure.vue', () => {
  let person, wrapper
  beforeEach(() => {
    get.mockImplementation(_ => Promise.resolve({}))
    localStorage.setItem('me', '/+16282281824')
    person = {
      first_name: 'Scott',
      last_name: 'Fryxell',
      id: '/+16282281823'
    }
    wrapper = shallow(as_figure, {
      propsData: {
        person: person
      }
    })
  })
  it('Render a person\'s profile info', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
  describe('rendering avatar', () => {
    it('Render the users avatar', () => {
      let avatar = wrapper.find('[itemprop=avatar]')
      expect(avatar.empty).toBeFalsy()
      person.avatar = avatar_mock
      wrapper.setProps({ person: person })
      avatar = wrapper.find('[itemprop=avatar]')
      expect(avatar.empty).not.toBeTruthy()
    })
  })
  describe('svg.avatar@click', () => {
    let router
    beforeEach(() => {
      const localVue = createLocalVue()
      localVue.use(VueRouter)
      router = new VueRouter()
      wrapper = shallow(as_figure, {
        localVue,
        router,
        propsData: { person }
      })
    })
    it('Go to the mobile number when clicked', () => {
      wrapper.vm.avatar_click()
      expect(wrapper.vm.$route.path).toBe('/+16282281823')
    })
    it('When is_me is true should go to the account page', () => {
      localStorage.me = person.id
      wrapper.setProps({ person })
      wrapper.vm.avatar_click()
      expect(wrapper.vm.$route.path).toBe('/account')
    })
  })
})
