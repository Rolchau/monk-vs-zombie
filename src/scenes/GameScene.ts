import Phaser from 'phaser';
import Monk from '../game-objects/Monk';

export default class Game extends Phaser.Scene {
  //  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private groundLayer!: Phaser.Tilemaps.TilemapLayer;
  private marker!: Phaser.GameObjects.Graphics;
  private monk!: Monk;

  constructor() {
    super('game-scene');
  }

  init() {
    // this.cursors = this.input.keyboard?.createCursorKeys();
  }

  create() {
    // Tilemap setup
    const map = this.make.tilemap({ key: 'level-1' });
    const tileset = map.addTilesetImage('Tron', undefined);

    if (tileset === null) throw Error('Tileset not found');
    this.groundLayer = map.createLayer('ground', tileset) as Phaser.Tilemaps.TilemapLayer;

    if (this.groundLayer === null) throw Error('GroundLayer not found');
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(this.groundLayer);

    // Marker
    this.marker = this.add.graphics();
    this.marker.lineStyle(5, 0xffffff, 1);
    this.marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);
    this.marker.lineStyle(3, 0xff4f78, 1);
    this.marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);

    // Monk setup
    const spawnPoint = map.findObject('objects', (obj) => obj.name === 'spawn point');
    if (spawnPoint === null) throw Error('Spawnpoint not found');
    this.monk = new Monk(this, spawnPoint.x || 0, spawnPoint.y || 0);
    this.cameras.main.setZoom(1);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.monk.sprite);
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update() {
    const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;

    const pointerTileXY = this.groundLayer.worldToTileXY(worldPoint.x, worldPoint.y);
    const snappedWorldPoint = this.groundLayer?.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);

    this.monk.update();

    this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);

    if (this.input.manager.activePointer.isDown) {
      this.groundLayer?.putTileAtWorldXY(7, worldPoint.x, worldPoint.y);
    }
  }
}
