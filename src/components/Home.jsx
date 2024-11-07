import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Button, Row, Col } from "react-bootstrap";

const Home = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api?results=5")
      .then((response) => {
        setProfiles(response.data.results);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-5">Profile List</h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {profiles.map((profile, index) => (
          <Col key={index}>
            <Card className="shadow-lg border-light rounded">
              <Card.Img
                variant="top"
                src={profile.picture.medium}
                className="rounded-circle mx-auto mt-3"
                style={{ width: "120px", height: "120px" }}
              />
              <Card.Body>
                <Card.Title>{profile.name.first} {profile.name.last}</Card.Title>
                <Card.Text>
                  <small className="text-muted">{profile.email}</small>
                </Card.Text>
                <Link to={`/profile/${index}`}>
                  <Button variant="primary">View Profile</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
