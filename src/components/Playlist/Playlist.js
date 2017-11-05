import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';


class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

// event handler for changes to the playlist.
    handleNameChange(event) {
       this.props.onNameChange(event.target.value);
    }


    render() {
      return (
           <div className="Playlist">
              <input
                    defaultValue={'New Playlist'}
                    onChange={this.handleNameChange}/>

              <TrackList
                    tracks={this.props.playlistTracks}
                    onRemove={this.props.onRemove} />

              <a
                   onClick={this.props.onSave}
                   className="Playlist-save">SAVE TO SPOTIFY</a>
           </div>
      )
    }
}

export default Playlist;
