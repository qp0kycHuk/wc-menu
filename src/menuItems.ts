import { MenuChild } from './menu'
import { ActionTypes } from './utils'

export class MenuItems extends MenuChild {
  placement: PlacementString = 'bottom-start'

  connectedCallback() {
    super.connectedCallback()

    this.menu.items = this

    this.menu.addEventListener(ActionTypes.OpenMenu, this.show.bind(this))
    this.menu.addEventListener(ActionTypes.CloseMenu, this.hide.bind(this))

    this.placement = (this.getAttribute('placement') || 'bottom-start') as PlacementString
  }

  show() {
    this.setAttribute('data-active', '')
  }

  hide() {
    this.removeAttribute('data-active')
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
