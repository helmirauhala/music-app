import { useState } from "react";
import { Card, Button, Form, Spinner } from "react-bootstrap";

const API_KEY = "d5ab0cc7fa4f7ce9665a6a43cb1d1901";  // do not change a thing

export default function Artist() {
  const [artistName, setArtistName] = useState("");
  const [info, setInfo] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  async function searchArtist() {
    setLoading(true);
    setInfo(null);
    setTracks([]);

    // fetch artist bio + listeners 
    const infoUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${API_KEY}&format=json`;
    const infoRes = await fetch(infoUrl);
    const infoData = await infoRes.json();

    if (infoData.artist) {
      setInfo({
        name: infoData.artist.name,
        bio: infoData.artist.bio.summary.replace(/<\/?[^>]+(>|$)/g, ""),
        listeners: infoData.artist.stats.listeners,
        playcount: infoData.artist.stats.playcount,
        image: infoData.artist.image?.[3]?.["#text"],
      });
    }

    // top tracks
    const trackUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artistName}&api_key=${API_KEY}&format=json&limit=5`;
    const trackRes = await fetch(trackUrl);
    const trackData = await trackRes.json();

    if (trackData.toptracks?.track) {
      setTracks(trackData.toptracks.track);
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 50 , fontWeight: "bold"}}>
      <h1 style={{ fontSize: "60px", fontWeight: "bold" }}>Artist Info</h1>


      <Form.Control
        type="text"
        placeholder="Enter artist name..."
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        style={{ fontSize:"25px", padding: "10px", marginTop: "10px", display:"block",width:"100%"}}
      />
      
      

      <Button 
      onClick={searchArtist}
      variant="dark"
      style={{ marginTop: "15px", display:"block", fontSize: "25px", padding: "8px 16px" }}
      >Search
      </Button>
      

      {loading && <Spinner animation="border" style={{ marginTop: 20 }} />}

      {info && (
        <Card style={{ marginTop: 20, padding: 20, maxWidth: "40rem" }}>
          <Card.Title>{info.name}</Card.Title>
          {info.image && (
            <img
              src={info.image}
              alt={info.name}
              style={{ width: 200, borderRadius: 10, marginBottom: 10 }}
            />
          )}
          <Card.Text>
            <strong>Listeners:</strong> {info.listeners} <br />
            <strong>Playcount:</strong> {info.playcount} <br /><br />
            {info.bio || "No bio available."}
          </Card.Text>
        </Card>
      )}

      {tracks.length > 0 && (
        <>
          <h3 style={{ marginTop: 30 }}>Top Songs</h3>
          {tracks.map((track, i) => (
            <Card
              key={i}
              style={{
                width: "18rem",
                marginBottom: "15px",
                padding: 10,
              }}
            >
              <Card.Title>{track.name}</Card.Title>
              <Card.Subtitle className="text-muted">
                Plays: {track.playcount}
              </Card.Subtitle>
              <Button
                href={track.url}
                target="_blank"
                variant="primary"
                style={{ marginTop: 10 }}
              >
                Listen
              </Button>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

