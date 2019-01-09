// @flow
import * as React from 'react';
import './style.css';

type Props = {
  currentPage: number,
  totalSize: number,
  setPage: Function,
}

const Pagination = (props: Props) => {
  const setPage = e => {
    e.preventDefault();
    props.setPage(e.target.id)
  };

const pages = () => {
  const pagesCount = props.totalSize / 20;
  const pages = [];
  for(let i = 0; i<pagesCount; i++){
    pages.push(
      <span
        onClick={setPage}
        className={`pagination-page-item ${(i+1) === props.currentPage ? 'active' : ''}`}
        key={i}
        id={i+1}
      >
        {i+1}
        </span>
    )
  }

  return pages;
};

  return(
    <div className='pagination'>
      {pages()}
    </div>
  )
};

export default Pagination;
