// @flow
import * as React from 'react';
import './style.css';

type Props = {
  currentPage: number,
  totalSize: number,
  size: number,
  setPage: Function,
}

const Pagination = (props: Props) => {
  const setPage = e => {
    e.preventDefault();
    props.setPage(e.target.id)
  };

  const totalPages = Math.ceil(props.totalSize/props.size)

const pages1 = () => {
  const pagesCount = props.totalSize / props.size;
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

  const next = () => {
    props.currentPage !== totalPages && props.setPage(props.currentPage + 1)
  };

  const prev = () => {
    props.currentPage !== 1 && props.setPage(props.currentPage - 1)
  };

  const last = () => {
    props.setPage(totalPages)
  };

  const first = () => {
    props.setPage(1)
  };

  const pages = () => {
    let res = [];
    let pag = props.currentPage;

    for(let i=pag-2>0? pag-2 : 1; i<=(pag+2<totalPages? pag+2: totalPages); i++){
      res.push(<a className={i===pag? 'active': ''} onClick={()=>props.setPage(i)}>{i}</a>)
    }
    return res
  };

  return(
    <div className='pagination'>
      <a  onClick={first}> {'<<'}</a>
      <a  onClick={prev}> {'<'} </a>
      {props.currentPage - 2 > 2 && <a>...</a>}
      {pages()}
      {props.currentPage + 2 < totalPages && <a>...</a>}
      <a  onClick={next}> {'>'} </a>
      <a  onClick={last}> {'>>'} </a>
    </div>
  )
};

export default Pagination;
