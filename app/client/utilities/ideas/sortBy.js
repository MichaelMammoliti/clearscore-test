import moment from 'moment';

const sortBy = (ideas, sortBy) => {
  const sortedIdeas = ideas.sort((a, b) => {
    if (sortBy === 'date') {
      const currentItemTimestamp = +moment(a.updatedOn || a.createdOn).format('X');
      const nextItemTimestamp = +moment(b.updatedOn || b.createdOn).format('X');

      return (currentItemTimestamp < nextItemTimestamp) ? 1 : -1;
    }

    if (sortBy === 'title') {
      return (a.title > b.title) ? 1 : -1;
    }
  });

  return sortedIdeas;
};

export default sortBy;
