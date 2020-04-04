import Item from '@/modules/item'
import { get_download_url } from '@/persistance/Cloud'
// import { set } from 'idb-keyval'
export default {
  async load (itemid) {
    const url = await get_download_url(itemid)
    if (url) {
      const server_text = await (await fetch(url)).text()
      return Item.get_first_item(server_text)
    } else return null
  },
  as_query_id (itemid = '/+') {
    return itemid.substring(2).replace('/', '-').replace('/', '-')
  },
  as_fragment (itemid) {
    return `#${this.as_query_id(itemid)}`
  }
}

// check for it on the page
// check for it in local_storage
// check for it on indexdb
// check for it on the network
