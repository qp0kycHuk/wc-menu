import { MenuChild } from './menu'
import { ActionTypes, handleEvent } from './utils'

export class MenuItem extends MenuChild {
  handleEvent = handleEvent

  connectedCallback() {
    super.connectedCallback()

    this.addEventListener('click', this)
  }

  clickhandler() {
    this.dispatch(ActionTypes.CloseMenu)
  }
}

function register() {
  if (!customElements.get('c-menu-item')) {
    customElements.define('c-menu-item', MenuItem)
  }
}

export default { register }
