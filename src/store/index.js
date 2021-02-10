import { readonly } from 'vue'
import UserStore from './user'
import GlobalStore from './global'

export default readonly({
  User: UserStore,
  Global: GlobalStore
})
