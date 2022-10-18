import Phaser from 'phaser';

export default class MultiKey {
  private keys!: Record<string, any>[];
constructor(scene: Phaser.Scene, addedKeys: string[]) {
    this.keys = addedKeys.map((key) => scene.input.keyboard?.addKey(key)) as [];
  }
  isDown() {
    return this.keys.some((key) => key.isDown);
  }
  isUp() {
    return this.keys.every((key) => key.isUp);
  }
}
