const actions = {
  pickaxe: {
    name: "pickaxe",
    actionName: "mining",
    path: `pickaxe`,
    suffix: "pickaxe",
    animationFrameLength: 5,
    frameSize: {
      x: 32,
      y: 33,
      xSpace: 0,
      ySpace: 0,
    },
  },
  die: {
    name: "die",
    actionName: "dying",
    path: `die`,
    suffix: "die",
    animationFrameLength: 2,
    frameSize: {
      x: 32,
      y: 33,
      xSpace: 0,
      ySpace: 0,
    },
  },
  walk: {
    name: "walk",
    actionName: "walking",
    path: `walk`,
    suffix: "walk",
    animationFrameLength: 8,
    frameSize: {
      x: 32,
      y: 33,
      xSpace: 0,
      ySpace: 0,
    },
  },
};

export default actions;
