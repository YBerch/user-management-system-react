// @flow
import * as React from 'react';
import { uniqueKey } from '../../helpers';
import './style.css';

type Props = {
  currentPage: number,
  totalSize: number,
  size: number,
  setPage: Function,
}

const Pagination = (props: Props) => {

  const totalPages = Math.ceil(props.totalSize/props.size);

  const next = () => {
    props.currentPage !== totalPages && props.setPage(props.currentPage + 1);
  };

  const prev = () => {
    props.currentPage !== 1 && props.setPage(props.currentPage - 1);
  };

  const last = () => {
    props.setPage(totalPages);
  };

  const first = () => {
    props.setPage(1);
  };

  const pages = () => {
    let res = [];
    let pag = props.currentPage;

    for(let i=pag-2>0? pag-2 : 1; i<=(pag+2<totalPages? pag+2: totalPages); i++){
      res.push(<a key={uniqueKey()} className={i===pag? 'active': ''} onClick={()=>props.setPage(i)}>{i}</a>);
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
