import React from "react";
import "./SearchResults.css"; 

function SearchResults({ searchResults, addTrack }) {

    return (
        <div>
            {searchResults && searchResults.length > 0 ? (
                searchResults.map(track => (
                    <div className="track" key={track.id}>
                        <p><strong>{track.name}</strong> by <span className="album">{track.artists[0].name} ({track.album.name})</span></p>
                        <button onClick={() => addTrack(track)}>Add</button>
                    </div>
                ))
            ) : (
                <p>No results found.</p>
            )}
        </div>
    )
}

export default SearchResults;
