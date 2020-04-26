 // https://developers.caffeina.com/object-composition-patterns-in-javascript-4853898bb9d0
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { as_type } from '@/helpers/itemid'
import Local from '@/persistance/Local'
import Cloud from '@/persistance/Cloud'
import Paged from '@/persistance/Paged'
import profile from '@/helpers/profile'

export default class Storage {
  constructor (itemid) {
    this.id = itemid
    this.type = as_type(itemid)
    this.metadata = { contentType: 'text/html' }
  }
}
export class Me extends Storage {
  constructor () {
    let me = localStorage.getItem('me')
    if (me) return super(me)
    if (me = firebase.auth().currentUser) {
      const id = profile.from_e64(me.phoneNumber)
      localStorage.setItem('me', id)
      return super(id)
    }
    return { type: 'person' } // just a local user
  }
}
export class Person extends Local(Storage) {}
export class Relations extends Local(Storage) {}
export class Posts extends Paged(Cloud(Local(Storage))) {}
export class Events extends Paged(Cloud(Local(Storage))) {}
export class History extends Paged(Cloud(Local(Storage))) {}
export class Activity extends Cloud(Local(Storage)) {}
export class Avatar extends Cloud(Local(Storage)) {}
export class Poster extends Cloud(Local(Storage)) {}
