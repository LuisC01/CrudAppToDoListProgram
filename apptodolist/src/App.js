import "./App.css";
import Login from "./Components/Login";
import ToDoList from "./Components/ToDoList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App(props) {
  return (
    <div className="todo-app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/ToDoList" element={<ToDoList />} />
          <Route exact path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
