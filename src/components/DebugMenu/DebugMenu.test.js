import React from 'react';
import DebugMenu from './DebugMenu';
import { shallow } from 'enzyme';

let component;

const getDebugMenu = (props = {}) => (
  <DebugMenu
    {...{
      handlers: { handleWaterAllPlotsClick: () => {}, ...props.handlers },
      items: [],
      state: {
        ...props.state,
      },
      ...props.options,
    }}
  />
);

beforeEach(() => {
  component = shallow(getDebugMenu());
});

it('renders Debug', () => {
  expect(component.length).toEqual(1);
});