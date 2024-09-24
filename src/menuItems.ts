import { MenuChild } from './menu'
import { ActionTypes } from './utils'

export class MenuItems extends MenuChild {
  placement: PlacementString = 'bottom-start'

  connectedCallback() {
    super.connectedCallback()

    this.menu.items = this

    this.menu.addEventListener(ActionTypes.OpenMenu, this.render.bind(this))
    this.menu.addEventListener(ActionTypes.CloseMenu, this.render.bind(this))

    this.placement = (this.getAttribute('placement') || 'bottom-start') as PlacementString
  }

  render(){
    if (this.menu.opened) {
      this.setAttribute('data-active', '')
    } else {
      this.removeAttribute('data-active')
    }
  }
}

function register() {
  if (!customElements.get('c-menu-items')) {
    customElements.define('c-menu-items', MenuItems)
  }
}

export default { register }

type Align = 'start' | 'end'
type Placement = 'top' | 'right' | 'bottom' | 'left'
type PlacementString = Placement | `${Placement}-${Align}`
