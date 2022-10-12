import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/GameScene';
import Preloader from './scenes/Preloader';

new Phaser.Game(
  Object.assign(config, {
    scene: [Preloader, GameScene]
  })
);
