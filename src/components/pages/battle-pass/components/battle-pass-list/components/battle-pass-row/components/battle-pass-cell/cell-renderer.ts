type CellRendererOptions = {
  isLocked?: boolean;
  isPremium?: boolean;
  isTaken?: boolean;
  fxImageSrc?: string;
};

const cachedImagesMap: Record<string, HTMLOrSVGImageElement | undefined> = {};

class CellRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private options: CellRendererOptions;

  constructor(canvas: HTMLCanvasElement, options?: CellRendererOptions) {
    const { width, height } = canvas.getBoundingClientRect();

    this.canvas = canvas;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.options = options ?? {};
  }

  private renderBackground = () => {
    const { width, height } = this.canvas;
    const { isPremium, isTaken, isLocked } = this.options ?? {};

    if (isTaken) {
      this.ctx.fillStyle = isPremium ? "#7640f5" : "#0054c3";
    } else {
      const gradient = this.ctx.createLinearGradient(0, 0, 0, height);

      if (isLocked) {
        gradient.addColorStop(0, isPremium ? "#471A6A" : "#09376B");
        gradient.addColorStop(1, isPremium ? "#340C62" : "#093069");
      } else {
        gradient.addColorStop(0, isPremium ? "#EE84FF" : "#29D6FF");
        gradient.addColorStop(1, isPremium ? "#7740F5" : "#2596E4");
      }

      this.ctx.fillStyle = gradient;
    }

    this.ctx.filter = "none";
    this.ctx.fillRect(0, 0, width, height);
  };

  private renderGlowAndShadow = () => {
    const src = this.options.fxImageSrc;

    if (src) {
      const cachedImage = cachedImagesMap[src];

      if (cachedImage) {
        this.ctx.drawImage(
          cachedImage,
          0,
          0,
          this.canvas.width,
          this.canvas.height,
        );
      } else {
        const image = new Image(this.canvas.width, this.canvas.height);

        image.src = src;
        image.onload = () => {
          cachedImagesMap[src] = image;
          this.ctx.drawImage(
            image,
            0,
            0,
            this.canvas.width,
            this.canvas.height,
          );
        };
      }
    }
  };

  render = () => {
    this.renderBackground();
    this.renderGlowAndShadow();
  };
}

export default CellRenderer;
