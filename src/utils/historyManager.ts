export class HistoryManager {
  private historyStack: string[] = [];

  addPath(path: string) {
    if (
      !this.historyStack.length ||
      this.historyStack[this.historyStack.length - 1] !== path
    ) {
      this.historyStack.push(path);
    }
  }

  getPreviousPath(): string | null {
    if (this.historyStack.length > 1) {
      this.historyStack.pop();
      return this.historyStack[this.historyStack.length - 1];
    }
    return null;
  }

  clearHistory() {
    this.historyStack = [];
  }
}

export const historyManager = new HistoryManager();
