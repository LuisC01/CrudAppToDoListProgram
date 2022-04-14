import React, { useState, useEffect } from "react";
import "../App.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function ToDoList(props) {
  const DBUrl = "https://localhost:44339/api/ToDoLists";
  const DBUrlpost = "https://localhost:44339/ToDoList/add";
  const DBUrlput = "https://localhost:44339/api/ToDoLists";
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [gestorseleccionado, setGestorseleccionado] = useState({
    tasks: "",
  });

  const cerrarSesion = () => {
    cookies.remove("idTask", { path: "/" });
    cookies.remove("username", { path: "/" });
    navigate("/login");
  };

  React.useEffect(() => {
    if (!cookies.get("idTask") && navigate) {
      navigate("/");
    }
  }, [cookies.get("idTask"), navigate]);

  const peticionGet = async () => {
    axios
      .get(DBUrl)
      .then((response) => {
        setdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPut = async () => {
    if (gestorseleccionado.tasks === "") {
      alert("There are empty fields!");
    } else {
      axios
        .put(DBUrlput + "/" + gestorseleccionado.idTask, gestorseleccionado)
        .then((response) => {
          var Aux = data;
          Aux.map((gestor) => {
            if (gestor.idTask === gestorseleccionado.idTask)
              gestor.tasks = gestorseleccionado.tasks;
          });
          abrirCerrarModalEdit();
          peticionGet();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const peticionDelete = async () => {
    axios
      .delete(DBUrlput + "/" + gestorseleccionado.idTask)
      .then((response) => {
        setdata(data.filter((gestor) => gestor.idTask === response.data));
        abrirCerrarModalDelete();
        peticionGet();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPost = async () => {
    if (gestorseleccionado.tasks === "") {
      alert("There are empty fields!");
    } else {
      axios
        .post(DBUrlpost, gestorseleccionado)
        .then((response) => {
          setdata(data.concat(response.data));
          abrirCerrarModalInsertar();
          peticionGet();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const seleccionGestor = (gestor, caso) => {
    setGestorseleccionado(gestor);
    caso === "Edit" ? abrirCerrarModalEdit() : abrirCerrarModalDelete();
  };
  useEffect(() => {
    peticionGet();
  }, []);

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const abrirCerrarModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGestorseleccionado({
      ...gestorseleccionado,
      [name]: value,
    });
  };

  const mark = (e) => {
    if (
      document.getElementById(e.idTask).className.match(/(?:^|\s)line(?!\S)/)
    ) {
      document.getElementById(e.idTask).className = document
        .getElementById(e.idTask)
        .className.replace(/(?:^|\s)line(?!\S)/g, "");
    } else {
      document.getElementById(e.idTask).className = "line";
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="titulo">TO-DO-LIST</h1>
      <Button
        className="mb-3"
        variant="light"
        type="submit"
        onClick={() => abrirCerrarModalInsertar()}
      >
        ADD NEW TASK
      </Button>
      <table>
        {data.map((gestor) => (
          <tr key={gestor.idTask}>
            <td>
              {" "}
              <input
                type="checkbox"
                class="input-checkbox"
                name="checkbox"
                onChange={() => mark(gestor)}
              />{" "}
            </td>
            <td id={gestor.idTask}>
              <p className="Task">{gestor.tasks}</p>
            </td>
            <td>
              <button
                className="btnedit"
                type="submit"
                onClick={() => seleccionGestor(gestor, "Edit")}
              >
                EDIT
              </button>
              <button
                className="btndelete"
                variant="secondary"
                type="submit"
                onClick={() => seleccionGestor(gestor, "Delete")}
              >
                DELETE
              </button>
            </td>
          </tr>
        ))}
        <button
          className="mt-5"
          variant="secondary"
          type="submit"
          onClick={() => cerrarSesion()}
        >
          Logout
        </button>
      </table>
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Add new Task</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Add Task:</label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder=" Add Here"
              name="tasks"
              onChange={handleChange}
            ></input>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="success" onClick={() => peticionPost()}>
            Add
          </Button>
          <Button
            variant="secondary"
            onClick={() => abrirCerrarModalInsertar()}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit}>
        <ModalHeader>Edit This Task</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Edit Task:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="tasks"
              onChange={handleChange}
              value={gestorseleccionado && gestorseleccionado.tasks}
            ></input>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="success" onClick={() => peticionPut()}>
            Edit
          </Button>
          <Button variant="secondary" onClick={() => abrirCerrarModalEdit()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete}>
        <ModalBody>
          [Are You sure, you want Delete the Task{" "}
          {gestorseleccionado && gestorseleccionado.tasks} ?]
        </ModalBody>
        <ModalFooter>
          <Button variant="success" onClick={() => peticionDelete()}>
            YES
          </Button>
          <Button variant="secondary" onClick={() => abrirCerrarModalDelete()}>
            NO
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
