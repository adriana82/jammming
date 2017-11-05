import React  from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify';


class App extends React.Component{
  constructor(props){
     super(props);
     this.state = {
         searchResults: [],
         playlistName: 'New Playlist',
         playlistTracks: [],
     };
  // Bindings for the this states of all the components.
     this.addTrack = this.addTrack.bind(this);
     this.removeTrack = this.removeTrack.bind(this);
     this.updatePlaylistName = this.updatePlaylistName.bind(this);
     this.savePlaylist = this.savePlaylist.bind(this);
     this.search = this.search.bind(this);
  }

/* addTrack method takes an indicated track from the search results and adds it to
the playlist. */
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (!tracks.includes(track)) {
      tracks.push(track);
      this.setState({playlistTracks: tracks});
   }
}

// removeTrack method removes the track from the playlist when accessed.
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }

// updatePlaylistName changes the name of the playlist.
  updatePlaylistName(name) {
     this.setState({playlistName: name});
     }

// savePlaylist takes the new playlist  and adds it to the user's Spotify account.
  savePlaylist() {
     let playlistName = this.state.playlistName;
     let trackURIs = [];
     this.state.playlistTracks.forEach(track => {
       trackURIs.push('spotify:track:'+track.id);
     });
     Spotify.savePlaylist(playlistName, trackURIs);

  }


 search(term) {
     Spotify.search(term).then(tracks => {
         this.setState({searchResults: tracks});
     })
 }

  render() {
    Spotify.getAccessToken();
    return (
        <div>
           <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                   <SearchBar
                             onSearch={this.search}
                   />

                  <div className="App-playlist">
                       <SearchResults
                             searchResults={this.state.searchResults}
                             onAdd={this.addTrack}/>
                       <Playlist
                             playlistName={this.state.playlistName}
                             playlistTracks={this.state.playlistTracks}
                             onRemove={this.removeTrack}
                             onNameChange={this.updatePlaylistName}
                             onSave={this.savePlaylist} />

                 </div>
              </div>
      </div>
    );
  }
}

export default App;
