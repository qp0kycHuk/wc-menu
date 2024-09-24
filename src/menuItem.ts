import { MenuChild } from './menu'
import { ActionTypes } from './utils'

export class MenuItem extends MenuChild {
  connectedCallback() {
    super.connectedCallback()

    this.addEventListener('click', this.clickHandler)
  }

  clickHandler() {
    this.dispatch(ActionTypes.CloseMenu)
  }
}

function register() {
  if (!customElements.get('c-menu-item')) {
    customElements.define('c-menu-item', MenuItem)
  }
}

export default { register }
