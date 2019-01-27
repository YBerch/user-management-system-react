// @flow
import * as React from 'react';
import { history } from '../../../store';
import { uniqueKey } from '../../../helpers';
import './style.css';

type Props = {
  results: Object,
  setQuery: Function,
  dropdownRef: Object
}

const SearchDropdown = ({results, setQuery, dropdownRef}: Props): React.Element<any> => {

  const onClick = (e, path, id) => {
    e.preventDefault();
    setQuery('');
    history.push(`/${path}/${id}`);
  };

  const usersResults = () => {
    const { users } = results;
      return users.map(item => {
        return <div
          key={uniqueKey()}
          onClick={e => onClick(e, 'users', item._id)}
          className='search-dropdown-item'
        >
          <i className="fa fa-fw fa-user"></i>
          <span className='item-name'>{item.firstName} {item.lastName}</span>
          <span className='item-description'>{item.email}, {item.phone}</span>
          </div>
      })
  };

  const groupsResults = () => {
    const { groups } = results;
      return groups.map(item => {
        return <div
          key={uniqueKey()}
          onClick={e => onClick(e, 'groups', item._id)}
          className='search-dropdown-item'
        >
          <i className="fa fa-fw fa-group"></i>
          <span className='item-name'>{item.name}</span>
          <span className='item-description'></span>

        </div>
      })
  };

  const showResults = () => {
    const users = usersResults();
    const groups = groupsResults();
    if(users.length || groups.length) {
      return (
        <div>
          {users}{groups}
        </div>
      )
    } else {
      return <div className='search-dropdown-no-results'>No Results!</div>
    }
  };

  return (
    <div ref={dropdownRef} className='search-dropdown'>
      {showResults()}
    </div>
  )
};

export default SearchDropdown;
