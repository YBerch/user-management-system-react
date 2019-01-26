// @flow
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchDropdown from './SearchDropdown';
import { search, clearSearchResults } from '../../actions/actionCreators';
import { debounce } from '../../helpers';
import './style.css';

type Props = {
  search: Function,
  clearSearchResults: Function,
  results: Object
}

const SearchBar = (props: Props): React.Element<any> => {

  const search = useRef(debounce(props.search, 500));
  const dropdownRef = useRef(null);

  const [dropdownVisible, setDropdownVisible]: [boolean, Function] = useState(false);
  const [query, setQuery]: [string, Function] = useState('');

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);

  useEffect(() => {
    if(query) {
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
      props.results && props.clearSearchResults();
    }
  }, [query]);

  const onChange = e => {
    e.preventDefault();
    const query = e.target.value;
    search.current(query.trim());
    setQuery(query);
  };

  const onSubmit = e => {
    e.preventDefault();
    // props.search(query)
  };

  const showSearchResults = () => {
    if(dropdownVisible && props.results){
      return <SearchDropdown results={props.results} setQuery={setQuery} dropdownRef={dropdownRef}/>
    }
  };

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
      setQuery('');
      setDropdownVisible(false);
      props.results && props.clearSearchResults();
    }
  };

  return(
    <div>
    <div className='search-bar-container'>
      <form>
        <input className='search-input' onChange={onChange} type='input' value={query}/>
        <div className='search-button' onClick={onSubmit}>Search</div>
      </form>
    </div>
      {showSearchResults()}
    </div>
  )
};

const mapStateToProps = ({ search }) => ({
  results: search.results
});

const mapDispathToProps = dispatch => bindActionCreators({
  search,
  clearSearchResults
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispathToProps
)(SearchBar);
