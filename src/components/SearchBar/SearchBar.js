import React, { useState } from "react";

function SearchBar({ searchTerm, setSearchTerm, setSearchResults }) {
    
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();
        
        const token = localStorage.getItem("accessToken");

        if (!token) {
            alert("Access token missing. Please try logging in again.");
            return;
        }
        
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track`;

        fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const tracks = data.tracks.items;
            setSearchResults(tracks);
            
        })
        .catch(error => {
            alert("Something went wrong with your search.");
            console.error(error);
        });

    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={searchTerm} onChange={handleChange}>
                </input>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SearchBar;