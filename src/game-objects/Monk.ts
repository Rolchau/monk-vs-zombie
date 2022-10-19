import Phaser from 'phaser';
import Animation from '../constants/AnimationKeys';
import Texture from '../constants/TexturesKeys';
import MultiKey from '../utils/MultiKey';

export default class Monk {
  public sprite: Phaser.Physics.Matter.Sprite;
  private keys!: Record<string, any>;
  private jumpKeys!: MultiKey;
  private canJump: boolean;
  private isOnGround: any;
  private isJumpKeyDown: any;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.matter.add.sprite(x, y, Texture.Monk).setScale(2);

    // Body setup for the monk
    const bodies = scene.matter.bodies;
    const rect = bodies.rectangle(x, y, 32, 64, { chamfer: { radius: 10 } });
    const sensorA = bodies.rectangle(x, y, 2, 64, { isSensor: true });
    this.sprite.setExistingBody(rect);
    // Prevents the monk from rolling around when moving
    this.sprite.setFixedRotation();
    // Create animations from asesprite file - only added to this sprite
    this.sprite.anims.createFromAseprite(Texture.Monk);

    this.sprite.setOnCollide((pair: any) => {
      console.log(pair);
      this.canJump = true;
    });

    this.canJump = true;

    const { LEFT, RIGHT, UP, W, A, D } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard?.addKeys({ left: LEFT, right: RIGHT, up: UP, w: W, a: A, d: D }) as Record<
      string,
      any
    >;
    this.jumpKeys = new MultiKey(scene, ['W', 'UP']);
  }

  update() {
    if (this.keys.left.isDown || this.keys.a.isDown) {
      this.sprite.setFlipX(true);
      this.sprite.setVelocityX(-3);
      this.sprite.play({ key: Animation.run, repeat: -1 }, true);
    } else if (this.keys.right.isDown || this.keys.d.isDown) {
      this.sprite.setFlipX(false);
      this.sprite.setVelocityX(3);
      this.sprite.play({ key: Animation.run, repeat: -1 }, true);
    } else {
      this.sprite.setVelocityX(0);
      this.sprite.play({ key: Animation.idle, repeat: -1 }, true);
    }
    if (this.jumpKeys.isDown() && this.canJump) {
      console.log('Jump god darnit');
      this.sprite.setVelocityY(-7);
      this.canJump = false;
    }
  }
}
