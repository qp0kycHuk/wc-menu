import { MenuChild } from './menu'
import { ActionTypes, Keys } from './utils'

export class MenuButton extends MenuChild {
  connectedCallback() {
    super.connectedCallback()

    this.menu.addEventListener(ActionTypes.OpenMenu, this.render.bind(this))
    this.menu.addEventListener(ActionTypes.CloseMenu, this.render.bind(this))


    this.addEventListener('click', this.clickHandler.bind(this))
    this.addEventListener('keydown', this.keyDownHandler.bind(this))
    this.tabIndex = 0
    this.role = 'button'
    this.ariaExpanded = 'true'
    this.ariaPressed = 'true'
  }

  clickHandler() {
    this.dispatch(this.menu.opened ? ActionTypes.CloseMenu : ActionTypes.OpenMenu)
  }

  keyDownHandler(event: KeyboardEvent) {
    if (event.key === Keys.Space || event.key === Keys.Enter) {
      this.dispatch(this.menu.opened ? ActionTypes.CloseMenu : ActionTypes.OpenMenu)
    }
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
  if (!customElements.get('c-menu-button')) {
    customElements.define('c-menu-button', MenuButton)
  }
}

export default { register }
