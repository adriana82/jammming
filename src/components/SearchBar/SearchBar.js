import React  from 'react';
import './SearchBar.css';



class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

// event handler for changes to the search string from the input call.
  handleTermChange(event) {
    this.setState({
      term: event.target.value,
    });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') this.search();
  }

// method that calls the search method in App - which invokes the Spotify search object method.
  search() {
    this.props.onSearch(this.state.term);
    }


  render() {
    return (
      <div className="SearchBar">
        <input
          id='searchBar'
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
          onKeyPress={this.handleKeyPress}
          defaultValue={this.props.searchTerm} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
