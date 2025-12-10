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
            <SearchResults searchResults={searchResults} />
            <Playlist 
              playlistTracks={playlistTracks} 
              setPlaylistTracks={setPlaylistTracks}
            />
            <PlaylistControls />
          </div>
        } />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
}

export default AppContainer;