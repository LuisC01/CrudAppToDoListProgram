import React, { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Cookies from "universal-cookie";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const DBUrlpost = "https://localhost:44339/register";
  const DBUrllogin = "https://localhost:44339/api/Users";
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [gestorseleccionado, setGestorseleccionado] = useState({
    email: "",
    password: "",
  });

  const peticionPost = async () => {
    if (
      gestorseleccionado.email === "" ||
      gestorseleccionado.password === "" ||
      gestorseleccionado.password2 === ""
    ) {
      alert("There are empty fields!");
    } else {
      if (gestorseleccionado.password === gestorseleccionado.password2) {
        axios
          .post(DBUrlpost, gestorseleccionado)
          .then((response) => {
            setdata(data.concat(response.data));
            abrirCerrarModalInsertar();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Passwords do not match");
      }
    }
  };

  React.useEffect(() => {
    if (cookies.get("idTask") && navigate) {
      navigate("/ToDoList");
    }
  }, [cookies.get("idTask"), navigate]);

  const peticionDologin = async () => {
    axios
      .post(DBUrllogin, gestorseleccionado)
      .then((response) => {
        if (
          gestorseleccionado.email === "" ||
          gestorseleccionado.password === ""
        ) {
          alert("There are empty fields!");
        } else {
          if (response.status === 200) {
            alert("Successful Session");
            cookies.set("idTask", response.idTask, { path: "/" });
            cookies.set("email", response.email, { path: "/" });
            cookies.set("password", response.password, { path: "/" });
            navigate("/ToDoList");
          } else alert("Wrong Email or Password");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGestorseleccionado({
      ...gestorseleccionado,
      [name]: value,
    });
  };
  return (
    <div className="container-fluid loginbox">
      <h1 className="titulologin"> LOGIN TO-DO-LIST</h1>
      <Form>
        <Form.Group className="mb3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            defaultValue="email@example.com"
            className="inputslogin"
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
            required
          />
          <Form.Text className="text1"></Form.Text>
        </Form.Group>

        <Form.Group className="mb3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=" Enter Password"
            name="password"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          className="mt-4"
          variant="warning"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            peticionDologin();
          }}
        >
          Login
        </Button>
        <br></br>
        <Form.Label className="mt-2">or</Form.Label>
        <br></br>
      </Form>
      <Button
        className="mt8"
        variant="light"
        type="submit"
        onClick={() => abrirCerrarModalInsertar()}
      >
        Register
      </Button>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Add new Register</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              name="email"
              onChange={handleChange}
            ></input>
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              pattern=".{1,8}"
              name="password"
              onChange={handleChange}
            ></input>
            <label>Repeat Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              name="password2"
              onChange={handleChange}
            ></input>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="success" onClick={() => peticionPost()}>
            Register
          </Button>
          <Button
            variant="secondary"
            onClick={() => abrirCerrarModalInsertar()}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
