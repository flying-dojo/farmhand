import React, { useEffect, useMemo, useState } from 'react'
import { array, bool, func, number, object, string } from 'prop-types'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import classNames from 'classnames'

import FarmhandContext from '../../Farmhand.context'
import Plot from '../Plot'
import { FIELD_ZOOM_SCALE_DISABLE_SWIPE_THRESHOLD } from '../../constants'
import { fieldMode } from '../../enums'

import './Field.sass'

const {
  CLEANUP,
  FERTILIZE,
  HARVEST,
  PLANT,
  SET_SCARECROW,
  SET_SPRINKLER,
  WATER,
} = fieldMode

export const FieldContent = ({
  columns,
  field,
  fitToScreen,
  hoveredPlot,
  rows,
  setFitToScreen,
  setHoveredPlot,
  zoomIn,
  zoomOut,
}) => {
  const fieldContent = useMemo(
    () => (
      <TransformComponent>
        {Array(rows)
          .fill(null)
          .map((_null, i) => (
            <div className="row" key={i}>
              {Array(columns)
                .fill(null)
                .map((_null, j, arr, plotContent = field[i][j]) => (
                  <Plot
                    key={j}
                    {...{
                      hoveredPlot,
                      plotContent,
                      setHoveredPlot,
                      x: j,
                      y: i,
                    }}
                  />
                ))}
            </div>
          ))}
      </TransformComponent>
    ),
    [rows, columns, field, hoveredPlot, setHoveredPlot]
  )
  return (
    <>
      {fieldContent}
      <div className="fab-buttons zoom-controls">
        <Fab
          {...{
            'aria-label': 'Fit to screen',
            color: 'primary',
            className: 'fit-to-screen-button',
            onClick: () => setFitToScreen(!fitToScreen),
          }}
        >
          <ZoomOutMapIcon />
        </Fab>
        <Fab
          {...{
            'aria-label': 'Zoom In',
            color: 'primary',
            onClick: zoomIn,
          }}
        >
          <AddIcon />
        </Fab>
        <Fab
          {...{
            'aria-label': 'Zoom Out',
            color: 'primary',
            onClick: zoomOut,
          }}
        >
          <RemoveIcon />
        </Fab>
      </div>
    </>
  )
}

FieldContent.propTypes = {
  columns: number.isRequired,
  field: array.isRequired,
  fitToScreen: bool.isRequired,
  hoveredPlot: object.isRequired,
  rows: number.isRequired,
  setHoveredPlot: func.isRequired,
  setFitToScreen: func.isRequired,
  zoomIn: func.isRequired,
  zoomOut: func.isRequired,
}

export const Field = props => {
  const { fieldMode, handleFieldZoom, purchasedField } = props

  const [hoveredPlot, setHoveredPlot] = useState({ x: null, y: null })
  const [currentScale, setCurrentScale] = useState(1)
  const [fitToScreen, setFitToScreen] = useState(true)

  useEffect(() => {
    handleFieldZoom(currentScale)
  }, [currentScale, handleFieldZoom])

  return (
    <div
      {...{
        className: classNames('Field', {
          'cleanup-mode': fieldMode === CLEANUP,
          'fertilize-mode': fieldMode === FERTILIZE,
          'fit-to-screen': fitToScreen,
          'harvest-mode': fieldMode === HARVEST,
          'plant-mode': fieldMode === PLANT,
          'set-scarecrow-mode': fieldMode === SET_SCARECROW,
          'set-sprinkler-mode': fieldMode === SET_SPRINKLER,
          'water-mode': fieldMode === WATER,
        }),
        'data-purchased-field': purchasedField,
      }}
    >
      <TransformWrapper
        {...{
          limitToWrapper: true,
          pan: {
            disabled: currentScale < FIELD_ZOOM_SCALE_DISABLE_SWIPE_THRESHOLD,
          },
          // These -1s prevent NREs within react-zoom-pan-pinch, but also
          // disable zoom animations.
          zoomIn: {
            animationTime: -1,
          },
          zoomOut: {
            animationTime: -1,
          },
          onZoomChange: ({ scale }) => {
            // If setCurrentScale with scale < 1 is called here, it causes a
            // reference error within react-zoom-pan-pinch.
            if (scale >= 1) {
              setCurrentScale(scale)
            }
          },
          wheel: {
            disabled: true,
          },
          doubleClick: { disabled: true },
        }}
      >
        {transformProps => (
          <FieldContent
            {...{
              ...props,
              ...transformProps,
              fitToScreen,
              hoveredPlot,
              setFitToScreen,
              setHoveredPlot,
            }}
          />
        )}
      </TransformWrapper>
      <div {...{ className: 'spacer' }} />
    </div>
  )
}

Field.propTypes = {
  columns: number.isRequired,
  field: array.isRequired,
  fieldMode: string.isRequired,
  handleFieldZoom: func.isRequired,
  purchasedField: number.isRequired,
  rows: number.isRequired,
}

export default function Consumer(props) {
  return (
    <FarmhandContext.Consumer>
      {({ gameState, handlers }) => (
        <Field {...{ ...gameState, ...handlers, ...props }} />
      )}
    </FarmhandContext.Consumer>
  )
}
