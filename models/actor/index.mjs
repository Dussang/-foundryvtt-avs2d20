const {
  HTMLField,
  NumberField,
  SchemaField,
  StringField,
  ObjectField,
  ArrayField,
  FilePathField,
} = foundry.data.fields;
import { DAMAGE_TYPE } from "../constants.mjs";

/* -------------------------------------------- */
/*  Actor Models                                */
/* -------------------------------------------- */
class ActorDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    // All Actors have resources.
    return {
      health: new SchemaField({
        max: new NumberField({
          required: true,
          integer: true,
          min: 1,
          initial: 1,
        }),
        current: new NumberField({
          required: true,
          integer: true,
          min: 0,
        }),
      }),
      energy: new SchemaField({
        max: new NumberField({
          required: true,
          integer: true,
          min: 1,
          initial: 1,
        }),
        current: new NumberField({
          required: true,
          integer: true,
          min: 0,
        }),
      }),
    };
  }
  /**
   * Determine when the character starts to die
   * @type {boolean}
   */
  get passedOut() {
    return this.health.value <= this.health.min;
  }

  /**
   * Determine when the character will lose consciousness from mental impotence
   * @type {boolean}
   */
  get mentalPassedOut() {
    return this.energy.value <= this.energy.min;
  }
}

class ImportantActorDataModel extends ActorDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),

      // Character Characteristics
      level: new NumberField({
        required: true,
        integer: true,
        min: 0,
        initial: 0,
        max: 20,
      }),

      attributes: new SchemaField({
        muscles: new NumberField({
          required: true,
          blank: true,
          min: 0,
          max: 10,
          initial: 5,
        }),
        reaction: new NumberField({
          required: true,
          blank: true,
          min: 0,
          max: 10,
          initial: 5,
        }),
        perception: new NumberField({
          required: true,
          blank: true,
          min: 0,
          max: 10,
          initial: 5,
        }),
        will: new NumberField({
          required: true,
          blank: true,
          min: 0,
          max: 10,
          initial: 5,
        }),
        charisma: new NumberField({
          required: true,
          blank: true,
          min: 0,
          max: 10,
          initial: 5,
        }),
        mind: new NumberField({
          required: true,
          blank: true,
          min: 0,
          max: 10,
          initial: 5,
        }),
        luck: new NumberField({
          required: true,
          blank: true,
          min: 0,
          max: 10,
          initial: 5,
        }),
      }),
      luckPoints: new SchemaField({
        max: new NumberField({
          required: true,
          integer: true,
          min: 0,
        }),
        current: new NumberField({
          required: true,
          integer: true,
          min: 0,
        }),
      }),
      traits: new ArrayField(new StringField()),
      skills: new ArrayField(new ObjectField()),

      // Secondary attributes
      initiative: new NumberField({ required: true, min: 2 }),
      defaultProtection: new NumberField({ required: true, min: 0 }),
      meleeDamage: new NumberField({}),
      load: new SchemaField({
        max: new NumberField({
          required: true,
          initial: 0,
        }),
        current: new NumberField({
          required: true,
          initial: 0,
        }),
      }),

      portrait: new FilePathField({ required: false, categories: ["IMAGE"] }),
      token: new FilePathField({ required: false, categories: ["IMAGE"] }),
      background: new SchemaField({
        background: new StringField({ required: true, blank: true }),
        biography: new HTMLField({ required: true, blank: true }),
        hairColor: new StringField({ required: true, blank: true }),
        eyeColor: new StringField({ required: true, blank: true }),
        height: new StringField({ required: true, blank: true }),
        age: new StringField({ required: true, blank: true }),
        weight: new StringField({ required: true, blank: true }),
        skinColor: new StringField({ required: true, blank: true }),
      }),

      // Damage Resistances
      DR: new SchemaField({
        physicalDR: new NumberField({
          label: DAMAGE_TYPE.PHYSICAL,
          required: true,
          integer: true,
        }),
        psyDR: new NumberField({
          label: DAMAGE_TYPE.PSY,
          required: true,
          integer: true,
        }),
        energyDR: new NumberField({
          label: DAMAGE_TYPE.ENERGY,
          required: true,
          integer: true,
        }),
        toxicDR: new NumberField({
          label: DAMAGE_TYPE.TOXIC,
          required: true,
          integer: true,
        }),
      }),
    };
  }
}

export class AgentDataModel extends ImportantActorDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),

      moment: new SchemaField({
        max: new NumberField({
          required: true,
          integer: true,
          min: 0,
        }),
        current: new NumberField({
          required: true,
          integer: true,
          min: 0,
          initial: 0,
        }),
      }),
    };
  }
}

export class NPCDataModel extends ImportantActorDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
    };
  }
}

export const config = {
  Agent: AgentDataModel,
  NPC: NPCDataModel,
};
