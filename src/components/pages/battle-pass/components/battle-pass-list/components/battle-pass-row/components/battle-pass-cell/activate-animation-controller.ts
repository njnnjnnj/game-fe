type Listener = () => void;

export class ActivateAnimationController {
  private listeners: Listener[];

  constructor() {
    this.listeners = [];
  }

  addActivateAnimationListener = (listener: Listener) => {
    this.listeners = [...this.listeners, listener];
  }

  activateAnimation = () => {
    if (!this.listeners.length) return;

    this.listeners.forEach((listener) => {
      listener();
    })

    this.listeners = [];
  }
}