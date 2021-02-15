import { readonly } from 'vue'
import UserModule from './user'
import GlobalModule from './global'
import PlacesModule from './places'

export default readonly({
  User: UserModule,
  Global: GlobalModule,
  Places: PlacesModule
})
