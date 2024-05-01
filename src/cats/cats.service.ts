import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  set newCat(cat: Cat) {
    this.cats.push(cat);
  }

  get all(): Cat[] {
    return this.cats;
  }

  getCat(id: number): Cat {
    if (id > this.cats.length - 1) throw new Error('No cat');
    return this.cats[id];
  }
}
