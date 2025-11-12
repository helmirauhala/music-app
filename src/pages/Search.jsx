import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export default function Search() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);

  async function searchSongs() {
    const res = await axios.get(
      `https://itunes.apple.com/search?term=${query}&entity=song&limit=30`
    );
    setSongs(res.data.results);
  }

  return (
    <Container
  style={{
    padding: "40px",
    maxWidth: "900px",
    width: "100%",        // prevents scroll lock here happend too many times do not change !!!!!
    margin: "0 auto",
    marginTop: "center",     
  }}
>
      <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>Search Music</h1>

      <Form.Control
        type="text"
        placeholder="Search artist or song..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ fontSize: "25px", padding: "10px", marginTop: "10px", display:"block",width:"100%" }}
      />

      <Button
        onClick={searchSongs}
        variant="dark"
        style={{ marginTop: "15px", display:"block", fontSize: "25px", padding: "8px 16px" }}
      >
        Search
      </Button>

      

      {songs.map((track) => (
        <div
          key={track.trackId}
          style={{ marginBottom: 12, fontSize: "15x" }} // bigger text 
        >
          <Link to="/preview" state={{ track }} style={{ fontSize: "18px" }}>
            {track.trackName} - {track.artistName}
          </Link>
        </div>
      ))}
    </Container>
  );
}
