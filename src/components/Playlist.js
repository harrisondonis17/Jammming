import React from "react";

function Playlist({ playlistTracks, setPlaylistTracks, removeTrack }) {

    return (
        <div>
            {playlistTracks && playlistTracks.length > 0 ? (
                playlistTracks.map(track => (
                    <div className="track" key={track.id}>
                        <p>
                            <strong>{track.name}</strong> by <span className="album">{track.artists[0].name} ({track.album.name})</span>
                        </p>
                        <button onClick={() => removeTrack(track.id)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>No tracks in playlist.</p>
            )}
        </div>
    )
}

export default Playlist;