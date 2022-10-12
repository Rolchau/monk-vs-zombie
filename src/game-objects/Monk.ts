import Phaser from 'phaser';
import Animation from '../constants/AnimationKeys';
import Texture from '../constants/TexturesKeys';

export default class Monk {
  private sprite: Phaser.Physics.Matter.Sprite;
  keys: object | undefined;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    scene.anims.createFromAseprite(Texture.Monk);
    //    this.sprite = scene.matter.add.sprite(x, y, Texture.Monk).play({ key: Animation.run, repeat: -1, frameRate: 5 });
    this.sprite = scene.matter.add.sprite(x, y, Texture.Monk).play({ key: Animation.run, repeat: -1, frameRate: 5 });
    this.sprite.setSize(16, 32);

    const { LEFT, RIGHT, UP, W, A, D } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard?.addKeys({ left: LEFT, right: RIGHT, up: UP, w: W, a: A, d: D });
  }
  update() {
    if (this.keys.left.isDown || this.keys.a.isDown) {
      this.sprite.setFlipX(true);
    } else if (this.keys.right.isDown || this.keys.d.isDown) {
      this.sprite.setFlipX(false);
    }
  }
}
