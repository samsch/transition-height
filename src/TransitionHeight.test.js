/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import TransitionHeight from './TransitionHeight';

describe('TransitionHeight', () => {
  test('initially renders', () => {
    const component = renderer.create(
      <TransitionHeight>
        <span>Content</span>
      </TransitionHeight>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  // Needs more test, but not as trivial to write, since the component is
  // dependant on the DOM and lifecycle methods.
});
