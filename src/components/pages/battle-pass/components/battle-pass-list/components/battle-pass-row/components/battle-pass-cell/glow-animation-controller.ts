export class GlowAnimationController {
  private elements: HTMLElement[];
  private animations: Animation[];
  private isActive: boolean;

  constructor() {
    this.elements = [];
    this.animations = [];
    this.isActive = false;
  }

  addGlowElement = (element: HTMLElement) => {
    this.elements = [...this.elements, element];

    if (!this.isActive) {
      this.isActive = true;

      // Wait a bit to avoid starting animation with only 1 element
      setTimeout(this.startAnimation, 500);
    }
  };

  removeGlowElement = (element: HTMLElement) => {
    this.elements = this.elements.filter((el) => el !== element);

    if (!this.elements.length) {
      this.isActive = false;
    }
  };

  startAnimation = async () => {
    if (!this.elements.length) return;

    await Promise.all(
      this.elements.map(
        (element) =>
          element.animate(
            [
              { transform: "translateX(-120%) rotateZ(15deg)" },
              { transform: "translateX(120%) rotateZ(15deg)" },
            ],
            { duration: 1000, delay: 1500 },
          ).finished,
      ),
    );

    this.startAnimation();
  };
}
