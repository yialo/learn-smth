export class ArgListIterator {
  readonly #list: string[];
  #currentIndex: number;

  constructor(argList: string[]) {
    this.#list = argList;
    this.#currentIndex = -1;
  }

  #current(): string | undefined {
    return this.#list[this.#currentIndex];
  }

  hasNext(): boolean {
    return this.#currentIndex < this.#list.length - 1;
  }

  next(): string {
    if (!this.hasNext()) {
      throw new NoSuchElementException('next');
    }
    this.#currentIndex++;
    return this.#current() ?? '';
  }

  nextIndex(): number {
    return this.hasNext() ? this.#currentIndex + 1 : -1;
  }

  hasPrevious(): boolean {
    return this.#currentIndex > 0;
  }

  previous(): string {
    if (!this.hasPrevious()) {
      throw new NoSuchElementException('previous');
    }
    this.#currentIndex--;
    return this.#current() ?? '';
  }

  previousIndex(): number {
    return this.hasPrevious() ? this.#currentIndex - 1 : -1;
  }
}

export class NoSuchElementException extends Error {
  constructor(method: 'next' | 'previous') {
    super(`${ArgListIterator.name} has no ${method} element.`);
  }
}
