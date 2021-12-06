import { shallowMount, flushPromises } from '@vue/test-utils'
import Relations from '@/views/Relations'
import * as itemid from '@/use/itemid'
describe('@/views/Relations.vue', () => {
  const joe_friday = {
    id: '/+14151234356',
    type: 'person',
    first_name: 'Joe',
    last_name: 'Friday'
  }
  describe('Renders', () => {
    it('Relationship information', async () => {
      const my = {
        id: '/+16282281824/relations',
        type: 'relations',
        relations: [{ id: '/+14151234356' }]
      }
      const load_relations = jest
        .spyOn(itemid, 'list')
        .mockImplementation(() => Promise.resolve(my.relations))
      const load_profile = jest
        .spyOn(itemid, 'load')
        .mockImplementation(() => Promise.resolve(joe_friday))
      const wrapper = await shallowMount(Relations, {
        global: {
          stubs: ['router-link', 'router-view']
        }
      })
      await flushPromises()
      expect(wrapper.vm.relations.length).toBe(1)
      expect(load_relations).toBeCalled()
      expect(load_profile).toBeCalled()
      expect(wrapper.element).toMatchSnapshot()
    })
    it('Fails gracefully when relations has been deleted', async () => {
      const my = {
        id: '/+16282281824/relations',
        type: 'relations',
        relations: [{ id: '/+14151234356' }]
      }
      const load_relations = jest
        .spyOn(itemid, 'list')
        .mockImplementation(() => Promise.resolve(my.relations))
      const load_profile = jest
        .spyOn(itemid, 'load')
        .mockImplementation(() => Promise.resolve(null))
      const wrapper = await shallowMount(Relations, {
        global: {
          stubs: ['router-link', 'router-view']
        }
      })
      await flushPromises()
      expect(wrapper.vm.relations.length).toBe(0)
      expect(load_relations).toBeCalled()
      expect(load_profile).toBeCalled()
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
