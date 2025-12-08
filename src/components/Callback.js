import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Callback() {
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        const code = params.get("code");
        console.log(code);

        fetch("http://localhost:8888/callback", 
            { method: "POST", 
              headers: {"Content-Type": "application/json"}, 
              body: JSON.stringify({code})
            }
        ).then(response => response.json())
         .then(data => {
            localStorage.setItem("accessToken", data.access_token);
            navigate("/dashboard");
        })
    }, [navigate]);
    
    return <></>
}

export default Callback;