export class MenuShadow extends HTMLElement {}

function register() {
  if (!customElements.get('c-menu-shadow')) {
    customElements.define('c-menu-shadow', MenuShadow)
  }
}

export default { register }
