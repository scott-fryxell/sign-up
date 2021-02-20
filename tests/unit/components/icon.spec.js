import { shallowMount } from '@vue/test-utils'
import icon from '@/components/icon'

describe('@/components/icon', () => {
  describe('Renders', () => {
    it('An icon', () => {
      const wrapper = shallowMount(icon, {
        propsData: { name: 'realness' }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
