import * as models from "../models/index.mjs";
import * as documents from "../documents/index.mjs";

export function initHook() {
  // Configure custom Document implementations.
  CONFIG.Actor.documentClass = documents.AVSActor;
  CONFIG.Item.documentClass = documents.AVSItem;

  // Configure System Data Models.
  CONFIG.Actor.dataModels = models.actors.config;
  CONFIG.Item.dataModels = models.items.config;
}
