import Phaser from 'phaser';

const physicsObj = {
  default: 'matter',
  matter: {
    debug: true,
  },
};

export default {
  type: Phaser.CANVAS,
  parent: 'game',
  dom: {
    createContainer: true,
  },
  backgroundColor: '#00A3DA',
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  fps: {
    target: 60,
    smoothStep: true,
  },
  physics: physicsObj,
  pixelArt: true,
  antialiasGL: false,
  batchSize: 512,
};
