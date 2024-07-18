const {
  NumberField,
  StringField,
  ArrayField,
} = foundry.data.fields;
import { DAMAGE_TYPE, BODY_AREAS, DISTANCES } from "../constants.mjs";

/* -------------------------------------------- */
/*  Item Models                                 */
/* -------------------------------------------- */
class ItemDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      legal: new StringField({
        required: true,
        integer: true,
        min: 0,
        max: 5,
      }),
      price: new NumberField({
        min: 0,
      }),
      weight: new NumberField({
        required: true,
        min: 0,
      }),
    };
  }
}

export class WeaponDataModel extends ItemDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      defaultSkill: new StringField({ required: true }),
      damage: new NumberField({
        required: true,
        integer: true,
        positive: true,
        min: 1,
      }),
      damageType: new StringField({
        blank: false,
        options: Object.values(DAMAGE_TYPE),
      }),
      damageProperties: new ArrayField(new StringField()),
      ammunition: new NumberField({
        integer: true,
        positive: true,
        min: 1,
      }),
      speed: new NumberField({
        required: true,
        integer: true,
        positive: true,
        min: 0,
      }),
      distance: new StringField({
        blank: false,
        options: Object.values(DISTANCES).map((distance) => distance.name),
      }),
      weaponProperties: new ArrayField(new StringField()),
    };
  }
}
export class ClothesDataModel extends ItemDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      areas: new ArrayField(
        new StringField({
          blank: false,
          options: Object.values(BODY_AREAS),
        })
      ),
      // Damage Resistances
      physicalDR: new NumberField({
        required: true,
        integer: true,
      }),
      psyDR: new NumberField({
        required: true,
        integer: true,
      }),
      energyDR: new NumberField({
        required: true,
        integer: true,
      }),
      toxicDR: new NumberField({
        required: true,
        integer: true,
      }),
    };
  }
}

// TODO: Various tools
export class EquipmentDataModel extends ItemDataModel {}

// TODO: Food, drinks and drugs
export class ConsumableDataModel extends ItemDataModel {}

export const config = {
  weapon: WeaponDataModel,
  clothes: ClothesDataModel,
  consumable: ConsumableDataModel,
  equipment: EquipmentDataModel,
} 