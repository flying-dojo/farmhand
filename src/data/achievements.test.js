import { testCrop } from '../test-utils'
import * as reducers from '../reducers'

import { achievementsMap } from './achievements'

jest.mock('./items')
jest.mock('./levels', () => ({ levels: [] }))
jest.mock('./recipes')
jest.mock('./shop-inventory')

describe('harvest-crop', () => {
  describe('condition', () => {
    let inputState

    beforeEach(() => {
      inputState = {
        cropsHarvested: {},
        field: [
          [null, null, testCrop({ itemId: 'sample-crop-1', daysWatered: 4 })],
        ],
        inventory: [],
        inventoryLimit: -1,
      }
    })

    describe('is not met', () => {
      test('returns false', () => {
        expect(
          achievementsMap['harvest-crop'].condition(inputState, inputState)
        ).toEqual(false)
      })
    })

    describe('is met', () => {
      test('returns true', () => {
        expect(
          achievementsMap['harvest-crop'].condition(
            reducers.harvestPlot(inputState, 2, 0),
            inputState
          )
        ).toEqual(true)
      })
    })
  })
})

const iAmRichVariants = [
  ['i-am-rich-1', 500000, 'Earn $500,000.', 'All sales receive a 5% bonus'],
  ['i-am-rich-2', 1000000, 'Earn $1,000,000.', 'All sales receive a 10% bonus'],
  [
    'i-am-rich-3',
    1000000000,
    'Earn $1,000,000,000.',
    'All sales receive a 25% bonus',
  ],
]

describe.each(iAmRichVariants)(
  'I am Rich variants',
  (id, goal, description, rewardDescription) => {
    describe(id, () => {
      test('has the expected description', () => {
        expect(achievementsMap[id].description).toEqual(description)
      })

      test('has the expected rewardDescription', () => {
        expect(achievementsMap[id].rewardDescription).toEqual(rewardDescription)
      })

      test(`is achieved when revenue is greater than or equal to ${goal}`, () => {
        const achievement = achievementsMap[id]
        const state = {
          revenue: goal,
        }

        expect(achievement.condition(state)).toEqual(true)
      })

      test(`is not achieved when revenue is less than ${goal}`, () => {
        const achievement = achievementsMap[id]
        const state = {
          revenue: goal - 1,
        }

        expect(achievement.condition(state)).toEqual(false)
      })
    })
  }
)
