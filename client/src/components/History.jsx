import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";

const History = (props) => {
  const { limit } = props;
  const update = () => {
    axios
      .get(
        `http://${document.domain}/batteries${limit ? `?limit=${limit}` : ""}/`,
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true,
          credentials: "same-origin",
        }
      )
      .then((response) => setHs(response.data))
      .catch((error) => {
        console.error(error);
      });
  };
  const [hs, setHs] = useState([{ noHistory: "Without history yet..." }]);
  useEffect(update, []);
  return (
    <Container>
      {props.limit ? (
        <h5>{`Last ${props.limit} batteries tested...`}</h5>
      ) : (
        <h2>Battery history</h2>
      )}
      <Button onClick={update}>Update</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            {Object.keys(hs[0])?.map((key) => {
              return <th>{`${key}`}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {hs.map((battery) => {
            return (
              <tr>
                {Object.keys(battery)?.map((key) => {
                  return key === "id" ? (
                    <td>
                      <Link
                        to={`/bat/${battery[key]}`}
                      >{`${battery[key]}`}</Link>
                    </td>
                  ) : (
                    <td>{`${battery[key]}`}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default History;
