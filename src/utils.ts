export class Dispatcher extends HTMLElement {
  dispatch(type: ActionTypes): boolean {
    const event = new CustomEvent(type, {
      bubbles: true,
    })

    return this.dispatchEvent(event)
  }
}

export enum ActionTypes {
  OpenMenu = 'c-menu:open',
  CloseMenu = 'c-menu:close',
}

export enum Keys {
  Space = ' ',
  Enter = 'Enter',
  Escape = 'Escape',
  Backspace = 'Backspace',
  Delete = 'Delete',

  ArrowLeft = 'ArrowLeft',
  ArrowUp = 'ArrowUp',
  ArrowRight = 'ArrowRight',
  ArrowDown = 'ArrowDown',

  Home = 'Home',
  End = 'End',

  PageUp = 'PageUp',
  PageDown = 'PageDown',

  Tab = 'Tab',
}
