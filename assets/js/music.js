const MusicPage = {};

MusicPage.loadSpotifyContent = async function () {


  const acessTokenData = await getAccessToken();
  const kOverrideData = false;
  const parsedPlaylistData = await getPlaylistData(acessTokenData.token, acessTokenData.isNew || kOverrideData);
  console.log("populating page");
  populatePage(parsedPlaylistData);

}


async function getAccessToken() {
  if (localStorage.getItem("spotify-access-token")) {
    const access_token_data = JSON.parse(localStorage.getItem("spotify-access-token"));
    const currentTime = new Date();
    const expirationTime = new Date(access_token_data.expirationTime);
    if (expirationTime > currentTime) {
      console.log(`there is :${expirationTime - currentTime} time before new access token`);
      const accessTokenData = JSON.parse(localStorage.getItem("spotify-access-token"));
      accessTokenData.isNew = false;
      return accessTokenData;
    } else {
      console.log("access token expired");
    }
  }
  console.log("getting access token");
  const client_id = '1b352e5ba35049b1918e0b310494107e';
  const client_secret = 'b79d65aa4cca4e389c38ad01497bb981';

  const data = new URLSearchParams();
  data.append("grant_type", "client_credentials");
  data.append("client_id", client_id);
  data.append("client_secret", client_secret);
  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data

  }).then(response => response.json())
    .then(data => {
      console.log("setting access token");
      const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
      const accessTokenData = {
        token: data.access_token,
        expirationTime: expirationTime
      }
      localStorage.setItem("spotify-access-token", JSON.stringify(accessTokenData));
      accessTokenData.isNew = true;
      return accessTokenData;

    }).catch(error => {
      console.log("error", error);
    });

}

async function getPlaylistData(token, isNewToken) {
  if (localStorage.getItem("cachedPlaylistData") && !isNewToken) {
    console.log("using cashed data");
    return JSON.parse(localStorage.getItem("cachedPlaylistData"));
  }
  
  //
  console.log("fetching new playlist data");
  async function getParsedPlaylistData(playlistsData, authToken) {

    return Promise.all(playlistsData.items.map(async (playlist) => {
      //get tracks
      const tracks = await fetch(playlist.tracks.href, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      })
      .then(response => response.json())
      .then(data => {
        return data.items.map(track => track.track);
      })
      const artists = tracks.map((track) => {
        return track.artists.map(artists => {
          return{
            artistName: artists.name,
            artistUrl: artists.external_urls.spotify
          }
        });
      }).flat();
      let artistSet = new Set();
      const filteredArtists = [];
      for(const artist of artists){
        if(!artistSet.has(artist.artistName)){
          artistSet.add(artist.artistName);
          filteredArtists.push(artist);
        }
      }
      console.log(filteredArtists);

      const playlistImg = playlist.images[0];
      const playlistUrl = playlist.external_urls.spotify;
      return {
        imageUrl: playlistImg.url,
        playlistUrl: playlistUrl,
        artists: filteredArtists
      };
    })).then(data => {
      //song data
      return data;
    });
  } //end get getParsedPlaylistData
  
  const numPlaylists = 20;
  const url = `https://api.spotify.com/v1/users/simonlhopkins/playlists?limit=${numPlaylists}`;
  //get the parsed data
  return fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(response => response.json())
  .then(async (data) => {
    const parsedData = await getParsedPlaylistData(data, token);
    localStorage.setItem("cachedPlaylistData", JSON.stringify(parsedData));
    return parsedData;
  })
  .catch(error => console.error('Error:', error));
}





const populatePage = function (parsedPlaylists) {
  const container = document.querySelector("#playlistContainer");
  parsedPlaylists.forEach(playlist => {
    container.appendChild(createPlaylistGridCell(playlist));
  })

}
const createPlaylistGridCell = function (playlist) {
  //view 
  const playListWrapper = document.createElement("div");
  const playlistImgSection = document.createElement("div");
  playlistImgSection.className = "playlistImgSection";
  const playlistBackingImg = document.createElement("img");
  playListWrapper.className = "playListWrapper";
  playlistBackingImg.src = playlist.imageUrl;
  const artistDiv = createArtistLabelsDiv(playlist.artists);
  const a = document.createElement("a");
  a.href = playlist.playlistUrl;
  a.target = "_blank";
  a.innerHTML = "listen to playlist";
  playlistImgSection.appendChild(playlistBackingImg);
  playlistImgSection.appendChild(artistDiv);
  playListWrapper.appendChild(playlistImgSection);
  playListWrapper.appendChild(a);
  return playListWrapper;
}
const createArtistLabelsDiv = function (artists) {
  const artistDiv = document.createElement("div");
  artistDiv.className = "artistLabels";
  artists.forEach(artist => {
    const a = document.createElement("a");
    a.href = artist.artistUrl;
    a.target = "_blank";
    a.innerHTML = artist.artistName;
    artistDiv.appendChild(a);
  });
  return artistDiv;
}


MusicPage.loadSpotifyContent();