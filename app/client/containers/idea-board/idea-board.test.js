import React from 'react';
import { shallow } from 'enzyme';
import { IdeaBoard } from './index.js';

const getProps = () => ({
  actions: {
    load: () => {},
    create: () => {},
    edit: () => {},
    remove: () => {},
    confirm: () => {},
    change: () => {},
    cancel: () => {},
    sort: () => {},
  },
});

const getUnit = (props = getProps()) =>
  shallow(<IdeaBoard {...props} />)
;

describe('<IdeaBoard />', () => {
  describe(`Render`, () => {
    it('should render correctly', () => {
      const unit = getUnit();

      expect(unit).toMatchSnapshot();
    });
  });

  describe(`Events`, () => {

  });

  describe('Props and DOM Nodes', () => {

  });
});
