import React from "react";

function PlaylistControls({ playlistName, setPlaylistName, playlistTracks }) {

    const handleChange = e => setPlaylistName(e.target.value);

    const handleSubmit = (e) => {
        
        e.preventDefault();

        const token = localStorage.getItem("accessToken");

        if (!token) {
            alert("Access token missing. Please log in again.");
            return;
        }

        const getUserUrl = "https://api.spotify.com/v1/me";

        fetch(getUserUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const userId = data.id;
            const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
            return fetch(createPlaylistUrl, {
            method: "POST", 
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: playlistName })
            })
        })
        .then(response => response.json())
        .then(data => {
            const playlistId = data.id;
            const addTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
            const trackUris = playlistTracks.map(track => track.uri);
            return fetch(addTracksUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ uris: trackUris })
            })
        })
        .then(response => response.json())
        .then(() => {
            alert("Playlist saved!");
        })
        .catch(error => {
            alert("Failed to add tracks.");
            console.error(error);
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={playlistName} onChange={handleChange}></input>
                <button>Save to Spotify</button>
            </form>
        </div>
    )
}

export default PlaylistControls;    