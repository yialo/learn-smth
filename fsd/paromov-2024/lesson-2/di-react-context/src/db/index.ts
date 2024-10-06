import { nanoid } from 'nanoid';

export class DbRepository<Entity extends { id: string }> {
  #entities: Entity[];

  constructor(initialEntities: Entity[]) {
    this.#entities = initialEntities;
  }

  getEntities() {
    return Promise.resolve(this.#entities);
  }

  insertEntity(payload: Omit<Entity, 'id'>) {
    const entity = { id: nanoid(), ...payload } as Entity;
    this.#entities.push(entity);
    return Promise.resolve(entity);
  }

  deleteEntity(id: string) {
    const filtered = this.#entities.filter((entity) => entity.id !== id);
    this.#entities = filtered;
    return Promise.resolve(id);
  }
}
