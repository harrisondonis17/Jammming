import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Callback from "../components/Callback";
import SearchBar from "../components/SearchBar/SearchBar";
import SearchResults from "../components/SearchResults/SearchResults";
import Playlist from "../components/Playlist";
import PlaylistControls from "../components/PlaylistControls";

function AppContainer() {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist")

  const addTrack = (trackToAdd) => {
    setPlaylistTracks(prev => 
      prev.some(track => track.id === trackToAdd.id) ? prev : [...prev, trackToAdd]);
  }
  
  const removeTrack = (trackIdToRemove) => {
    setPlaylistTracks(prev => prev.filter(track => track.id !== trackIdToRemove));
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            <SearchBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setSearchResults={setSearchResults}
            />
            <SearchResults 
              searchResults={searchResults}
              addTrack={addTrack}
            />
            <Playlist 
              playlistTracks={playlistTracks} 
              setPlaylistTracks={setPlaylistTracks}
              removeTrack={removeTrack}
            />
            <PlaylistControls
              playlistName={playlistName}
              setPlaylistName={setPlaylistName}
              playlistTracks={playlistTracks}
            />
          </div>
        } />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
}

export default AppContainer;