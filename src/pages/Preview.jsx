import { useLocation } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function Preview() {
  const location = useLocation();
  const track = location.state?.track; // data passed from Search do not change

  if (!track) {
    return <h2 style={{ padding: 20 }}>No track selected.</h2>;
  }

  return (
    <div style={{ padding: 20 }}>
      <Card style={{ width: "300px" }}>
        <Card.Img variant="top" src={track.artworkUrl100} />
        <Card.Body>
          <Card.Title>{track.trackName}</Card.Title>
          <Card.Subtitle>{track.artistName}</Card.Subtitle>

          <audio controls style={{ width: "100%", marginTop: 10 }}>
            <source src={track.previewUrl} type="audio/mpeg" />
          </audio>

          <Button href={track.trackViewUrl} target="_blank" style={{ marginTop: 10 }}>
            Open in iTunes
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
