import React from 'react';

type FilterProps = {
  filter: string;
  setFilter: (filter: 'all' | 'completed' | 'incomplete') => void;
};

const Filter = ({ filter, setFilter }: FilterProps) => {
  return (
    <div className="btn-group mb-3">
      <button
        type="button"
        className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        type="button"
        className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
      <button
        type="button"
        className={`btn ${filter === 'incomplete' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setFilter('incomplete')}
      >
        Incompleted
      </button>
    </div>
  );
};

export default Filter;
