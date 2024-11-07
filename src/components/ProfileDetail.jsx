import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, ListGroup, Button } from "react-bootstrap";

const ProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api?results=5")
      .then((response) => {
        setProfile(response.data.results[id]);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [id]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-link mb-4">
        <i className="bi bi-arrow-left-circle"></i> Back to Profiles
      </Link>
      <Card className="shadow-lg border-light rounded">
        <Card.Img
          variant="top"
          src={profile.picture.large}
          className="rounded-circle mx-auto mt-3"
          style={{ width: "150px", height: "150px" }}
        />
        <Card.Body className="text-center">
          <Card.Title>{profile.name.first} {profile.name.last}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{profile.email}</Card.Subtitle>
          <Card.Text>
            <i className="bi bi-telephone-fill"></i> {profile.phone}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item><strong>Gender:</strong> {profile.gender}</ListGroup.Item>
          <ListGroup.Item>
            <strong>Location:</strong> {profile.location.city}, {profile.location.country}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Username:</strong> {profile.login.username}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body className="text-center">
          <Button variant="warning" onClick={() => alert('Message sent!')}>
            <i className="bi bi-envelope-fill"></i> Send Message
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileDetail;
