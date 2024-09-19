import { Stats } from '../schema/stats.schema';
import { NumberHelper } from '@libs/helper/number.helper';

export class StarterHelper {
  static generateStats(): Stats {
    return {
      base_atk: NumberHelper.randomInt(5, 10),
      atk_spd: NumberHelper.randomArbitrary(0.7, 1.2),
      base_def: NumberHelper.randomInt(5, 10),
      crit_chance: 0,
      crit_damage: 100,
      hp: 100,
      life_steal: 0,
      magic_atk: 0,
      magic_def: NumberHelper.randomInt(5, 10),
      personality: {
        ki: NumberHelper.randomArbitrary(0, 15),
        magic: NumberHelper.randomArbitrary(0, 15),
        strength: NumberHelper.randomArbitrary(0, 15),
        reflex: 0,
      },
      physical_atk: 10,
      physical_def: NumberHelper.randomInt(5, 10),
    };
  }
}
