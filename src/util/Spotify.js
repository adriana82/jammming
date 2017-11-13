const clientId ='fbd1e6017dec4dbf9a34d082742409b2';
const redirectURI = 'http://localhost:3000';
let accessToken;

 const Spotify = {
// method used to get access token to utilize the SpotifyAPI.
  getAccessToken() {
       if (accessToken) {
           return accessToken;
       }
       const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
       const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
       if (accessTokenMatch && expiresInMatch) {
         accessToken = accessTokenMatch[1];
         const expiresIn = Number(expiresInMatch[1]);
         window.setTimeout(() => accessToken = '', expiresIn * 1000);
         window.history.pushState('Access Token', null, '/');
         return accessToken;
       }else {
         const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
         window.location = accessUrl;
       }
    },

  /* method that takes the previously genereated Access token and performs search
  with the term passed from the App component. */
  search(term) {
       accessToken = Spotify.getAccessToken();
       const fetchURL = `https://api.spotify.com/v1/search?type=track&q=${term}`;
       const headers = {headers: {Authorization: `Bearer  ${accessToken}`}};
       return fetch(fetchURL, headers).then(response => {
           if (response.ok) {
              return response.json();
           }
           throw new Error('Request failed!');
       }, networkError => console.log(networkError.message)
       ).then(jsonResponse => {
          if (jsonResponse.tracks.items) {
            return jsonResponse.tracks.items.map(track => {
              return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                thumb: track.album.images[2].url
              };
            })
          } else return [];
       });
    },//end search

 /* method that takes the given playlist and saves to the users Spotify account. */
  savePlaylist(playlistName, trackUris) {
     if(!playlistName || !trackUris.length) {
         return;
     }

    accessToken = Spotify.getAccessToken();
    const headers = {
        Authorization:`Bearer ${accessToken}`
    };
    let userId;

    return fetch("https://api.spotify.com/v1/me", {
           headers: headers
         }).then(response => response.json()).then(jsonResponse => {
           userId = jsonResponse.id;
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({name: playlistName})
        }).then(response => response.json()).then(jsonResponse => {
            const playlistId = jsonResponse.id;
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method:'POST',
          body: JSON.stringify({uris:trackUris})
          });
          });
          });
  }

};
export default Spotify;
