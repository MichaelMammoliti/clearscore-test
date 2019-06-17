import ReducerFns from './reducer-fns';
import { IdeaUtilities } from '../../../utilities';
import moment from 'moment';

describe('ReducerFns', () => {
  describe('.create', () => {
    it(`should return an object with a 'temporaryIdea' key set as object`, () => {
      const state = {
        something: true,
      };

      const actual = ReducerFns.create({}, state);
      const expected = {
        something: true,
        temporaryIdea: {},
      };

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('.change', () => {
    describe('when state.temporaryIdea exists in the state', () => {
      it(`should update the 'temporaryIdea' object in the state`, () => {
        const state = {
          temporaryIdea: {
            id: 1
          },
        };

        const actual = ReducerFns.change({ description: 'changed it' }, state);
        const expected = {
          temporaryIdea: {
            id: 1,
            description: 'changed it'
          },
        };

        expect(actual).toStrictEqual(expected);
      });

      describe('when state.ideaToEdit exists in the state', () => {
        it(`should update the 'ideaToEdit' object in the state`, () => {
          const state = {
            ideaToEdit: {
              id: 1,
            },
          };

          const actual = ReducerFns.change({ description: 'changed it' }, state);
          const expected = {
            ideaToEdit: {
              id: 1,
              description: 'changed it',
            },
          };

          expect(actual).toStrictEqual(expected);
        });
      });
    });
  });

  describe('.confirmEdit', () => {
    it(`should create an 'updatedOn' key with a valid date format to be processed.`, () => {
      const idea = {
        id: 0,
        text: 'something',
      };

      const state = {
        ideas: [idea],
        ideaToEdit: {
          id: 0,
          text: 'changed',
        },
      };

      const actual = ReducerFns.confirmEdit({}, state);

      expect(actual.ideas.length).toBe(1);
      expect(actual.ideas[0]).toHaveProperty('updatedOn');
      expect(moment(actual.ideas[0].updatedOn).isValid()).toBe(true);
    });

    it(`should remove the 'ideaToEdit' key from the state.`, () => {
      const idea = {
        text: 'something',
      };

      const ideaToEdit = {
        id: 0,
        text: 'changed',
      };

      const state = {
        ideas: [idea],
        ideaToEdit,
      };

      const actual = ReducerFns.confirmEdit({}, state);

      expect(actual).not.toHaveProperty('ideaToEdit');
    });

    it(`should edit the idea correctly by mergin the 'ideaToEdit' key into state.ideas.`, () => {
      const idea = {
        id: 0,
        text: 'something',
      };

      const ideaToEdit = {
        id: 0,
        text: 'changed',
        description: 'changed',
      };

      const state = {
        ideas: [idea],
        ideaToEdit,
      };

      const actual = ReducerFns.confirmEdit({}, state);

      expect(actual.ideas.length).toBe(1);
      expect(actual.ideas[0].text).toBe(ideaToEdit.text);
      expect(actual.ideas[0].description).toBe(ideaToEdit.description);
    });
  });

  describe('.confirmAdd', () => {
    it(`should keep track of the amount of ideas existed by creating a 'lastIdeaID' key`, () => {
      const state = {
        ideas: [],
        temporaryIdea: {},
      };

      const s1 = ReducerFns.confirmAdd({}, state);
      const s2 = ReducerFns.confirmAdd({}, s1);
      const s3 = ReducerFns.confirmAdd({}, s2);

      expect(s3).toHaveProperty('lastIdeaID');
      expect(s3.lastIdeaID).toBe(2);
    });

    it(`should create an unique 'id' into the new idea`, () => {
      const state = {
        ideas: [],
        temporaryIdea: {},
      };

      const actual = ReducerFns.confirmAdd({}, state);

      expect(actual.ideas[0]).toHaveProperty('id');
      expect(actual.ideas[0].id).toBe(0);
    });

    it(`should place the idea into state.ideas which is accessible by its own id`, () => {
      const state = {
        ideas: [],
        temporaryIdea: {},
      };

      const actual = ReducerFns.confirmAdd({}, state);

      expect(actual.ideas[0]).toHaveProperty('id');
      expect(actual.ideas[0].id).toBe(0);
    });

    it(`should delete the 'temporaryIdea' key from the state`, () => {
      const state = {
        ideas: [],
        temporaryIdea: {},
      };

      const newState = ReducerFns.confirmAdd({}, state);

      expect(newState).not.toHaveProperty('temporaryIdea');
    });

    describe('when there are no ideas into the state', () => {
      describe(`and the 'state.lastIdeaID' is not set`, () => {
        it('should create an idea with an id of 0', () => {
          const state = {
            ideas: [],
            temporaryIdea: {},
          };

          const newState = ReducerFns.confirmAdd({}, state);

          expect(newState).toHaveProperty('lastIdeaID');
          expect(newState.lastIdeaID).toBe(0);
        });
      });

      describe(`and the 'state.lastIdeaID' is set`, () => {
        it('should increment state.lastIdeaID', () => {
          const state = {
            ideas: [],
            temporaryIdea: {},
            lastIdeaID: 5,
          };

          const newState = ReducerFns.confirmAdd({}, state);

          expect(newState).toHaveProperty('lastIdeaID');
          expect(newState.lastIdeaID).toBe(6);
        });
      });
    });

    it(`should add the new idea correctly into 'state.ideas'.`, () => {
      const temporaryIdea = {
        text: 'new idea',
        description: 'new description'
      };

      const state = {
        ideas: [],
        temporaryIdea: temporaryIdea,
      };

      const newState = ReducerFns.confirmAdd({}, state);

      expect(newState.ideas).toHaveProperty('0');
      expect(newState.ideas[0]).toHaveProperty('createdOn');
      expect(newState.ideas[0].text).toBe(temporaryIdea.text);
      expect(newState.ideas[0].description).toBe(temporaryIdea.description);
      expect(typeof newState.ideas[0].createdOn).toBe('string');
    });
  });

  describe('.confirm', () => {
    it(`should call .confirmEdit if state.ideaToEdit is set`, () => {
      const oldFn = ReducerFns.confirmEdit;

      const fn = ReducerFns.confirmEdit = jest.fn();

      const state = {
        ideaToEdit: {},
      };

      const payload = {
        hello: true,
      };

      ReducerFns.confirm(payload, state);

      expect(fn).toHaveBeenCalledWith(payload, state);

      ReducerFns.confirmEdit = oldFn;
    });

    it(`should call .confirmAdd if state.temporaryIdea is set`, () => {
      const oldFn = ReducerFns.confirmAdd;
      const mockedFn = jest.fn();

      ReducerFns.confirmAdd = mockedFn;

      const state = {
        ideas: [],
        temporaryIdea: {
          text: 'something'
        },
      };

      const payload = {
        hello: true,
      };

      ReducerFns.confirm(payload, state);

      expect(mockedFn).toHaveBeenCalledWith(payload, state);

      ReducerFns.confirmAdd = oldFn;
    });
  });
});
