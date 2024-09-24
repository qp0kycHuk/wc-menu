import menu from './menu'
import menuButton from './menuButton'
import menuItem from './menuItem'
import menuItems from './menuItems'
import menuShadow from './menuShadow'

function register() {
  menu.register()
  menuItems.register()
  menuButton.register()
  menuItem.register()
  menuShadow.register()
}

export default { register }
