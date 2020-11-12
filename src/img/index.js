import { cowColors } from '../enums'

import wateredPlot from './plot-states/watered-plot.png'
import fertilizedPlot from './plot-states/fertilized-plot.png'

import carrotSoup from './dishes/carrot-soup.png'
import cheese from './dishes/cheese.png'
import chocolate from './dishes/chocolate.png'
import jackolantern from './items/jackolantern.png'

import carrot from './items/carrot.png'
import carrotGrowing from './items/carrot-growing.png'
import carrotSeed from './items/carrot-seed.png'
import pumpkin from './items/pumpkin.png'
import pumpkinGrowing from './items/pumpkin-growing.png'
import pumpkinSeed from './items/pumpkin-seed.png'
import spinach from './items/spinach.png'
import spinachGrowing from './items/spinach-growing.png'
import spinachSeed from './items/spinach-seed.png'
import corn from './items/corn.png'
import cornGrowing from './items/corn-growing.png'
import cornSeed from './items/corn-seed.png'
import potato from './items/potato.png'
import potatoGrowing from './items/potato-growing.png'
import potatoSeed from './items/potato-seed.png'
import onion from './items/onion.png'
import onionGrowing from './items/onion-growing.png'
import onionSeed from './items/onion-seed.png'
import soybean from './items/soybean.png'
import soybeanGrowing from './items/soybean-growing.png'
import soybeanSeed from './items/soybean-seed.png'
import wheat from './items/wheat.png'
import wheatGrowing from './items/wheat-growing.png'
import wheatSeed from './items/wheat-seed.png'
import fertilizer from './items/fertilizer.png'
import scarecrow from './items/scarecrow.png'
import sprinkler from './items/sprinkler.png'
import cowFeed from './items/cow-feed.png'
import huggingMachine from './items/hugging-machine.png'
import milk1 from './items/milk-1.png'
import milk2 from './items/milk-2.png'
import milk3 from './items/milk-3.png'
import rainbowMilk1 from './items/rainbow-milk-1.png'
import rainbowMilk2 from './items/rainbow-milk-2.png'
import rainbowMilk3 from './items/rainbow-milk-3.png'
import chocolateMilk from './items/chocolate-milk.png'
import inventoryBox from './items/inventory-box.png'
import hoe from './tools/hoe.png'
import scythe from './tools/scythe.png'
import wateringCan from './tools/watering-can.png'

// TODO: Load the images with `import`
// https://create-react-app.dev/docs/adding-images-fonts-and-files/

export { default as pixel } from './pixel.png'

export const plotStates = {
  'watered-plot': wateredPlot,
  'fertilized-plot': fertilizedPlot,
}

export const craftedItems = {
  'carrot-soup': carrotSoup,
  cheese,
  chocolate,
  jackolantern,
}

export const items = {
  // Crops
  carrot,
  'carrot-growing': carrotGrowing,
  'carrot-seed': carrotSeed,
  pumpkin,
  'pumpkin-growing': pumpkinGrowing,
  'pumpkin-seed': pumpkinSeed,
  spinach,
  'spinach-growing': spinachGrowing,
  'spinach-seed': spinachSeed,
  corn,
  'corn-growing': cornGrowing,
  'corn-seed': cornSeed,
  potato,
  'potato-growing': potatoGrowing,
  'potato-seed': potatoSeed,
  onion,
  'onion-growing': onionGrowing,
  'onion-seed': onionSeed,
  soybean,
  'soybean-growing': soybeanGrowing,
  'soybean-seed': soybeanSeed,
  wheat,
  'wheat-growing': wheatGrowing,
  'wheat-seed': wheatSeed,

  // Field tools
  fertilizer,
  scarecrow,
  sprinkler,

  // Cow items
  'cow-feed': cowFeed,
  'hugging-machine': huggingMachine,
  'milk-1': milk1,
  'milk-2': milk2,
  'milk-3': milk3,
  'rainbow-milk-1': rainbowMilk1,
  'rainbow-milk-2': rainbowMilk2,
  'rainbow-milk-3': rainbowMilk3,
  'chocolate-milk': chocolateMilk,

  'inventory-box': inventoryBox,

  ...craftedItems,
}

export const tools = {
  hoe,
  scythe,
  'watering-can': wateringCan,
}

export const animals = {
  cow: Object.values(cowColors).reduce((acc, color) => {
    const lowerCaseColor = color.toLowerCase()
    acc[
      lowerCaseColor
    ] = require(`./animals/cows/${lowerCaseColor}-cow.png`).default
    return acc
  }, {}),
}
