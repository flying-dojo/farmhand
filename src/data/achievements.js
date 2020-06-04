import memoize from 'fast-memoize'

import {
  findInField,
  getCropLifeStage,
  getCrops,
  doesPlotContainCrop,
  moneyString,
} from '../utils'

import { cropLifeStage } from '../enums'

import { itemsMap } from './maps'

const { GROWN, SEED } = cropLifeStage

const addMoney = (state, reward) => ({ ...state, money: state.money + reward })

const achievements = [
  ((reward = 100) => ({
    id: 'plant-crop',
    name: 'Plant a Crop',
    description: 'Purchase a seed and plant it in the field.',
    rewardDescription: moneyString(reward),
    condition: state =>
      findInField(
        state.field,
        plot => doesPlotContainCrop(plot) && getCropLifeStage(plot) === SEED
      ),
    reward: state => addMoney(state, reward),
  }))(),

  ((reward = 150) => ({
    id: 'water-crop',
    name: 'Water a Crop',
    description: 'Water a crop that you planted.',
    rewardDescription: moneyString(reward),
    condition: state =>
      findInField(
        state.field,
        plot => doesPlotContainCrop(plot) && plot.wasWateredToday
      ),
    reward: state => addMoney(state, reward),
  }))(),

  ((reward = 200) => {
    const isPlotAGrownCrop = plot =>
      doesPlotContainCrop(plot) && getCropLifeStage(plot) === GROWN
    const getGrownCrops = field => getCrops(field, isPlotAGrownCrop)

    const getSumOfCropsInInventory = memoize(inventory =>
      inventory.reduce(
        (sum, { id, quantity }) =>
          // Duck type to see if item is a final-stage crop item
          itemsMap[id].cropTimetable ? (sum += quantity) : sum,
        0
      )
    )

    return {
      id: 'harvest-crop',
      name: 'Harvest a Crop',
      description: 'Harvest a crop that you planted.',
      rewardDescription: moneyString(reward),
      condition: (state, prevState) => {
        const grownCrops = getGrownCrops(state.field)
        const oldGrownCrops = getGrownCrops(prevState.field)

        if (grownCrops.length < oldGrownCrops.length) {
          const sumOfCropsInInventory = getSumOfCropsInInventory(
            state.inventory
          )
          const oldSumOfCropsInInventory = getSumOfCropsInInventory(
            prevState.inventory
          )

          if (sumOfCropsInInventory > oldSumOfCropsInInventory) {
            return true
          }
        }

        return false
      },
      reward: state => addMoney(state, reward),
    }
  })(),

  (() => ({
    id: 'unlock-crop-price-guide',
    name: 'Prove Yourself as a Farmer',
    description:
      'Show that you can run a farm by earning at least $10,000. Proven farmers get access to the Crop Price Guide, an invaluable tool for making better buying and selling decisions!',
    rewardDescription: 'Crop Price Guide',
    condition: state => state.money >= 10000,
    // Reward is a no-op for this achievement. The value of
    // state.completedAchievements['unlock-crop-price-guide'] (which is
    // automatically set to `true` in the achievement processing logic) is used
    // to gate the price guides.
    reward: state => state,
  }))(),
]

export default achievements

export const achievementsMap = achievements.reduce((acc, achievement) => {
  acc[achievement.id] = achievement

  return acc
}, {})