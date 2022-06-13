import {SearchBarProp} from '../types';

const SearchBar = (props: SearchBarProp) => {
  return (
    <input
      className="form-control mb-2"
      placeholder="Search"
      data-testid="search-bar"
      onChange={(e) => props.onSearch(e.target.value)}
    ></input>
  );
};

export default SearchBar;
