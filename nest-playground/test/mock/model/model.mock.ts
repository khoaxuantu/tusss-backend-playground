export abstract class ModelInsertMock<T> {
  protected entityStub: T;

  constructor(entityData: T) {
    this.entityStub = entityData;
  }

  save() {
    return this.entityStub;
  }
}
