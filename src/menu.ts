import { MenuItems } from './menuItems'
import { Dispatcher, ActionTypes, Keys, handleEvent } from './utils'
import { detectTouch } from 'detect-touch'

class Menu extends Dispatcher {
  opened = false
  items?: MenuItems
  mouseOutTimeout?: NodeJS.Timeout
  handleEvent = handleEvent
  shadow = document.createElement('c-menu-shadow')
  action = 'click'

  connectedCallback() {
    this.action = this.getAttribute('action') || this.action
    document.addEventListener('click', this)
    document.addEventListener('keyup', this)

    if (this.action === 'hover') {
      this.addEventListener('mouseover', this)
      this.addEventListener('mouseout', this)
    }

    this.addEventListener(ActionTypes.OpenMenu, this.open.bind(this))
    this.addEventListener(ActionTypes.CloseMenu, this.close.bind(this))

    this.appendChild(this.shadow)
  }

  disconnectedCallback() {
    document.removeEventListener('click', this)
    document.removeEventListener('keyup', this)
  }
  
  static observedAttributes = ['action']
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'action') {
      if (newValue === 'hover' && oldValue !== 'hover') {
        this.addEventListener('mouseover', this)
        this.addEventListener('mouseout', this)
      }

      if (newValue !== 'hover' && oldValue === 'hover') {
        this.removeEventListener('mouseover', this)
        this.removeEventListener('mouseout', this)
      }
    }
  }

  clickhandler(event: MouseEvent) {
    const target = event.target as Element
    const isShadow = this.shadow === target
    const isOuter = this !== target && !this.contains(target) && this.items !== target && !this.items?.contains(target)

    if (this?.opened && (isShadow || isOuter)) {
      this.dispatch(ActionTypes.CloseMenu)
    }
  }

  keyuphandler(event: KeyboardEvent) {
    if (event.key === Keys.Escape) {
      this.dispatch(ActionTypes.CloseMenu)
    }
  }

  mouseoverhandler(event: MouseEvent) {
    if (detectTouch()) return

    const target = event.target as Element
    const relatedTarget = event.relatedTarget as Element

    if ((this === target || this.contains(target)) && this !== relatedTarget && !this.contains(relatedTarget)) {
      this.dispatch(ActionTypes.OpenMenu)
    }
  }

  mouseouthandler(event: MouseEvent) {
    if (detectTouch()) return

    // timeout for menus with offset
    // depricated - using css menu-items::before properity
    this.mouseOutTimeout = setTimeout(() => {
      const relatedTarget = event.relatedTarget as Element

      if (this !== relatedTarget && !this.contains(relatedTarget)) {
        this.dispatch(ActionTypes.CloseMenu)
      }
    }, 0)
  }

  open(event: Event) {
    event.stopPropagation()
    clearTimeout(this.mouseOutTimeout)
    if (!this.opened) this.toggle()
  }

  close(event: Event) {
    event.stopPropagation()

    if (this.opened) {
      const menus = Array.from(this.querySelectorAll<Menu>('c-menu'))

      menus.forEach((menu) => menu.dispatch(ActionTypes.CloseMenu))

      this.toggle()
    }
  }

  toggle() {
    this.opened = !this.opened
    this.render()
  }

  render() {
    if (this.opened) {
      this.setAttribute('data-active', '')
      this.shadow.setAttribute('data-active', '')
    } else {
      this.removeAttribute('data-active')
      this.shadow.removeAttribute('data-active')
    }

    document.body.classList.toggle('c-menu-opened', this.opened)
  }
}

function register() {
  if (!customElements.get('c-menu')) {
    customElements.define('c-menu', Menu)
  }
}

export default { register }

export class MenuChild extends Dispatcher {
  menu: Menu = new Menu()

  connectedCallback() {
    const menu = this.closest<Menu>('c-menu')

    if (!menu) {
      throw new Error('Menu child component expect menu component as parent element')
    }

    this.menu = menu
  }
}
