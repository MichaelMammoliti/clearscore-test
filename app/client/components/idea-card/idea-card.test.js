import React from 'react';
import { shallow } from 'enzyme';

import IdeaCard from './idea-card';

const getProps = () => {
  return {
    editMode: false,
    description: '',
    title: '',
    id: 0,
    createdOn: '2008-09-15T15:53:00',
    updatedOn: '2009-09-15T15:53:00',
    onEdit: () => {},
    onRemove: () => {},
    onChange: () => {},
    onConfirm: () => {},
    onCancel: () => {},
  };
};

const getUnit = (props = getProps()) =>
  shallow(<IdeaCard {...props} />)
;

describe('<IdeaCard />', () => {
  describe(`Render`, () => {
    it('should render correctly', () => {
      const unit = getUnit();

      expect(unit).toMatchSnapshot();
    });
  });

  describe(`Events`, () => {
    describe('when clicking on .idea-card__actions-edit button', () => {
      it('should call props.onEdit with an id as argument', () => {
        const props = getProps();
        props.onEdit = jest.fn();

        const unit = getUnit(props);

        unit.find('.idea-card__actions-edit').childAt(0).simulate('click');

        expect(props.onEdit).toHaveBeenCalledWith(props.id);
      });
    });

    describe('when clicking on .idea-card__actions-remove button', () => {
      it('should call props.onRemove with an id as argument', () => {
        const props = getProps();
        props.onRemove = jest.fn();

        const unit = getUnit(props);

        unit.find('.idea-card__actions-remove').childAt(0).simulate('click');

        expect(props.onRemove).toHaveBeenCalledWith(props.id);
      });
    });

    describe(`when typing on the title's input`, () => {
      it('should call props.onChange and pass the correct object as argument', () => {
        const props = getProps();
        props.onChange = jest.fn();
        props.editMode = true;

        const unit = getUnit(props);

        unit.find('.idea-card__title input').simulate('change', { target: { value: 20 } });

        expect(props.onChange).toHaveBeenCalledWith({ title: 20 });
      });
    });

    describe(`when typing on the description's textarea`, () => {
      it('should call props.onChange and pass the correct object as argument', () => {
        const props = getProps();
        props.onChange = jest.fn();
        props.editMode = true;

        const unit = getUnit(props);

        unit.find('.idea-card__description textarea').simulate('change', { target: { value: 20 } });

        expect(props.onChange).toHaveBeenCalledWith({ description: 20 });
      });
    });
  });

  describe('Props and DOM Nodes', () => {


    describe('when editMode is set', () => {
      it('should render an input and a textarea', () => {
        const props = getProps();

        props.editMode = true;

        const unit = getUnit(props);

        expect(unit.find('.idea-card__description textarea').exists()).toBe(true);
        expect(unit.find('.idea-card__title input').exists()).toBe(true);
      });

      it('should render the correct action buttons', () => {
        const props = getProps();

        props.editMode = true;

        const unit = getUnit(props);

        expect(unit.find('.idea-card__actions-confirm').childAt(0).exists()).toBe(true);
        expect(unit.find('.idea-card__actions-cancel').childAt(0).exists()).toBe(true);
      });
    });

    describe('when editMode is not set', () => {
      it('should not render an input and a textarea', () => {
        const unit = getUnit();

        expect(unit.find('.idea-card__description textarea').exists()).toBe(false);
        expect(unit.find('.idea-card__title input').exists()).toBe(false);
      });

      it('should render a title and a description', () => {
        const props = getProps();
        props.title = 'title';
        props.description = 'description';

        const unit = getUnit(props);

        expect(unit.find('.idea-card__description p').text()).toBe('description');
        expect(unit.find('.idea-card__title p').text()).toBe('title');
      });

      it('should render the updatedOn date in the correct format when paassed', () => {
        const unit = getUnit();

        const actual = unit.find('.idea-card__dates__created-on').text();
        const expected = 'created on: 15/09/2008';

        expect(actual).toBe(expected);
      });

      it('should render the createdOn date in the correct format when paassed', () => {
        const unit = getUnit();

        const actual = unit.find('.idea-card__dates__updated-on').text();
        const expected = 'updated on: 15/09/2009';

        expect(actual).toBe(expected);
      });

      it('should render the correct action buttons', () => {
        const unit = getUnit();

        expect(unit.find('.idea-card__actions-edit').exists()).toBe(true);
        expect(unit.find('.idea-card__actions-remove').exists()).toBe(true);
      });
    });
  });
});
