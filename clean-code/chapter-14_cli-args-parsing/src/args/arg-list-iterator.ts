export class ArgListIterator {
  readonly #list: string[];
  #currentIndex: number;

  constructor(argList: string[]) {
    this.#list = argList;
    this.#currentIndex = -1;
  }

  current(): string | undefined {
    return this.#list[this.#currentIndex];
  }

  currentIndex(): number {
    return this.#currentIndex;
  }

  hasNext(): boolean {
    return this.#currentIndex < this.#list.length - 1;
  }

  next(): string | undefined {
    if (this.hasNext()) this.#currentIndex++;
    return this.current();
  }

  nextIndex(): number {
    return this.hasNext() ? this.#currentIndex + 1 : this.#currentIndex;
  }

  hasPrevious(): boolean {
    return this.#currentIndex > 0;
  }

  previous(): string | undefined {
    if (this.hasPrevious()) this.#currentIndex--;
    return this.current();
  }

  previousIndex(): number {
    return this.hasPrevious() ? this.#currentIndex - 1 : this.#currentIndex;
  }
}
