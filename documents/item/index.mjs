export default class AVSItem extends Item {
  get isFree() {
    return this.price < 1;
  }
}
