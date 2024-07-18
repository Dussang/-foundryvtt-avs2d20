const {
  HTMLField,
  NumberField,
  StringField,
  ArrayField,
} = foundry.data.fields;

export class TraitDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ranks: new NumberField({
        required: true,
        min: 1,
      }),
      requirements: new ArrayField(new StringField()),
      levelUp: new NumberField({}),
      description: new HTMLField({ required: true, blank: true }),
    };
  }
}

export const config = {
  trait: TraitDataModel,
}