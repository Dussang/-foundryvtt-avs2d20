/* -------------------------------------------- */
/*  Constants                                */
/* -------------------------------------------- */
export const DAMAGE_TYPE = {
    TOXIC: "Toxic",
    PSY: "Psy",
    PHYSICAL: "Physical",
    ENERGY: "Energy",
  };
  
  export const BODY_AREAS = {
    HEAD: "Head",
    HANDS: "Hands",
    LEGS: "Legs",
    BODY: "Body",
  };
  
  export const DISTANCES = {
    CLOSE: { name: "Close", value: 0, min: 0, max: 4 },
    SHORT: { name: "Short", value: 1, min: 5, max: 30 },
    AVERAGE: { name: "Average", value: 2, min: 31, max: 60 },
    LONG: { name: "Long", value: 3, min: 61, max: 90 },
    EXTREME: { name: "Extreme", value: 4, min: 91, max: 160 },
  };