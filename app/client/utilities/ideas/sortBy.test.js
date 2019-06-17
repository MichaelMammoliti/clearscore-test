import { sortBy } from './index';

describe('.sortBy', () => {
  it('should Sort by title correctly', () => {
    const input = [
      {title: "3"},
      {title: "2"},
      {title: "1"},
    ];

    const expected = [
      {title: "1"},
      {title: "2"},
      {title: "3"},
    ];

    const output = sortBy(input, 'title');

    expect(expected).toStrictEqual(output);
  });

  it('should Sort by date correctly', () => {
    const input = [
      {createdOn: "2019-08-17T10:11:11+01:00"},
      {createdOn: "2019-06-17T10:11:15+01:00"},
      {createdOn: "2019-07-17T10:11:13+01:00"},
    ];

    const expected = [
      {createdOn: "2019-08-17T10:11:11+01:00"},
      {createdOn: "2019-07-17T10:11:13+01:00"},
      {createdOn: "2019-06-17T10:11:15+01:00"},
    ];

    const output = sortBy(input, 'date');

    expect(expected).toStrictEqual(output);
  });
});
