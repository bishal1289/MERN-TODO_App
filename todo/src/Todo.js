import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Todo.css";

const Todo = () => {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);

  const refInput = useRef();

  useEffect(() => {
    getData();
  },[]);

  console.log(todo);

  const getData = async () => {
    await axios({
      method: "get",
      url: "http://localhost:3001/get",
    })
      .then((response) => {
        console.log(response.data);
        setTodo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTodo = async () => {
    if (input === "" || input.trim() === "") {
      alert("Write Something");
    }
    else {
      await axios({
        method: "post",
        url: "http://localhost:3001/add",
        data: {
          todo:input
        }
      })
        .then((response) => {
          console.log(response);
          setTodo((previous) => [...previous, response.data])
          setInput("")
          refInput.current.focus();
          getData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  const deleteItem = (id) => {
    axios({
      method: "delete",
      url: "http://localhost:3001/delete",
      data: { id },
    })
      .then((response) => {
        console.log(response);
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="wrapper">
      <h1>ToDo List</h1>
      <div className="input_div">
        <input
          type="text"
          placeholder="Enter Todo list"
          name="todo"
          ref={refInput}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="input"
        />
        <button onClick={addTodo} className="addButton" title="Add">
          +
        </button>
      </div>

      {/* <div>
        {data.map((ele, ind) => {
          return (
            <div id="listItem">
              <h2>{ele}</h2>
              <i
                className="fa-solid fa-trash-can"
                onClick={() => deleteItem(ind)}
                id="icon"
                title="Delete"
              ></i>
            </div>
          );
        })}
      </div> */}
      <div >
        <ul>
          {todo.map((item) => {
            return (
              <div id="listItem">
                <h2 key={item._id}>{item.todo}</h2>
                
                <i
                  className="fa-solid fa-trash-can"
                  onClick={() => deleteItem(item._id)}
                  id="icon"
                  title="Delete"
                ></i>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
