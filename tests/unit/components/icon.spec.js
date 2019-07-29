import { shallow } from 'vue-test-utils'
import icon from '@/components/icon'

describe('@/components/icon', () => {
  it('Renders an icon', () => {
    let wrapper = shallow(icon)
    expect(wrapper.element).toMatchSnapshot()
  })
})
