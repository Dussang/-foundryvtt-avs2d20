import { DAMAGE_TYPE, BODY_AREAS } from "../../models/constants.mjs";

export default class AVSActor extends Actor {
  // _setDefaultAttributes() {
  //   for (const attribute in this.system.attributes) {
  //     this.system.attributes[attribute] = 5;
  //   }
  // }

  _calculateHitPoints() {
    const maxHP =
      this.system.attributes?.muscles +
        this.system.attributes?.luck +
        this.system?.level ?? 1;``
    console.log(maxHP);
    console.log(this.system.attributes);
    this.system.health.max = maxHP;
    return (this.system.health.current = maxHP);
  }

  _calculateEnergyPoints() {
    const maxEP =
      this.system.attributes?.will +
        this.system.attributes?.mind +
        this.system?.level ?? 1;
    this.system.energy.max = maxEP;
    return (this.system.energy.current = maxEP);
  }

  _calculateLuckyPoints() {
    this.system.luckPoints.max = this.system.attributes?.luck ?? 0;
    return (this.system.luckPoints.current =
      this.system.attributes?.luck ?? 0);
  }

    _calculateMomentMaximum() {
      const will = this.system.attributes?.will;
      let moment;
      if (will <= 4) moment = 5;
      else if (will <= 6) moment = 6;
      else if (will <= 8) moment = 7;
      else if (will <= 10) moment = 8;
      else if (will >= 10) moment = 9;

      return this.system?.moment?.max = moment;
    }

  _calculateMomentMaximum() {
    const will = this.system.attributes?.will;
    let moment;
    if (will <= 4) moment = 5;
    else if (will <= 6) moment = 6;
    else if (will <= 8) moment = 7;
    else if (will <= 10) moment = 8;
    else if (will >= 10) moment = 9;

    return (this.system.moment.max = moment ?? 1);
  }

  // Calculate Secondary Attributes
  _calculateMelleDamage() {
    const muscles = this.system.attributes?.muscles;
    let meleeDamage;
    if (muscles <= 4) meleeDamage = 5;
    else if (muscles <= 6) meleeDamage = 6;
    else if (muscles <= 8) meleeDamage = 7;
    else if (muscles <= 10) meleeDamage = 8;
    else if (muscles >= 10) meleeDamage = 9;

    return (this.system.meleeDamage = meleeDamage ?? 1);
  }

  _calculateProtection() {
    const reaction = this.system.attributes?.reaction;
    let protection;
    if (reaction <= 4) protection = 5;
    else if (reaction <= 6) protection = 6;
    else if (reaction <= 8) protection = 7;
    else if (reaction <= 10) protection = 8;
    else if (reaction >= 10) protection = 9;

    return (this.system.meleeDamage = protection ?? 1);
  }

  _calculateInitiative() {
    let initiative =
      this.system.attributes?.reaction +
      this.system.attributes?.perception;
    return (this.system.initiative = initiative ?? 0);
  }

  _calculateLoad() {
    let loadCapacity = 30 * this.system.attributes?.muscles;
    return (this.system.loadCapacity = loadCapacity ?? 120);
  }

  _calculateMainAttributes() {
    console.log("+!!!!!!!!!!!!!!!!!!!!!!+++++++++++ Calculating main attributes");
    console.log(JSON.stringify(this.system))
    this._setDefaultAttributes();
    this._calculateHitPoints();
    this._calculateEnergyPoints();
    this._calculateLuckyPoints();
  }

  _calculateSecondaryAttribures() {
    this._calculateMelleDamage();
    this._calculateInitiative();
    this._calculateLoadCapacity();
    this._calculateProtection();
  }

  _prepareNPCData(actorData) {
    console.log("+!!!!!!!!!!!!!!!!!!!!!!+++++++++++ _prepareNPCData", this.type);
    if (this.type !== "NPC") return;
    this._calculateMainAttributes();
    this._calculateSecondaryAttribures();
  }

  _prepareAgentData(actorData) {
    console.log("+!!!!!!!!!!!!!!!!!!!!!!+++++++++++ _prepareAgentData", this.type);
    if (this.type !== "Agent") return;
    try {
      this._calculateMainAttributes();
      this._calculateSecondaryAttribures();
      this._calculateMomentMaximum();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /** @override */
  prepareData() {
    super.prepareData();
    console.log("THIS !+++++++++++++++++++++++++++++++++++++++++++++++++++++");
  }

  /**
   * @override
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    console.log("ONE !++++++++++++++++++++++++++++++++");
    this._prepareAgentData(this);
    this._prepareNPCData(this);
  }

  async getDRValue(type, area) {
    if (!Object.values(DAMAGE_TYPE).includes(type))
      throw new Error(`Invalid damage type: ${type}`);

    if (!Object.values(BODY_AREAS).includes(area))
      throw new Error(`Invalid damage area: ${area}`);

    for (let DR of Object.values(this.system.DR)) {
      if (DR.label === type) {
        return DR[area].value;
      }
    }
  }
}
