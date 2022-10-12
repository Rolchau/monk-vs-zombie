import Phaser from 'phaser';
import Texture from '../constants/TexturesKeys';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.path = 'assets/images/';
    this.load.aseprite(Texture.Monk, 'monk.png', 'monk.json');
    this.load.image(Texture.Tiles, 'tilemap.png');
    this.load.tilemapTiledJSON('level-1', '../levels/level-1.tmj');
  }

  create() {
    this.scene.start('game-scene');
  }
}
