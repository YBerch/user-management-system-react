// @flow
import * as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { search } from '../../actions/actionCreators';
import { debounce } from '../../helpers';
import './style.css';

type Props = {
  search: Function,
  results: Object
}

const SearchBar = (props: Props): React.Element<any> => {

  const [query, setQuery]: [string, Function] = useState('');

  const search = debounce(props.search, 1000);

  const onChange = e => {
    e.preventDefault();
    const query = e.target.value;
    // setQuery(e.target.value);
    if(e.target.value) {
      search(e.target.value)
    }
};

  const onSubmit = e => {
    e.preventDefault();
    // props.search(query)
  };

  return(
    <div className='search-bar-container'>
      <form>
        <input className='search-input' onChange={onChange} type='input'/>
        <div className='search-button' onClick={onSubmit}>Search</div>
      </form>
    </div>
  )
};

const mapStateToProps = ({ search }) => ({
  results: search.results
});

const mapDispathToProps = dispatch => bindActionCreators({
  search
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispathToProps
)(SearchBar);
