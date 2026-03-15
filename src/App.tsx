import "./App.css";
import { todosMachine } from "./machines/todosMachine";
import { createActor, } from "xstate";
import { useSelector, } from "@xstate/react";
import Counter from "./components/Counter";
import { fetchUserMachine } from "./machines/fetchUserMachine";
import { useState } from "react";

const todosActor = createActor(todosMachine).start();

const fetchUserActor = createActor(fetchUserMachine).start();

function App() {
  const [id, setId] = useState('');
  const state = useSelector(todosActor, (snapshot) => snapshot);

  return (
    <div className="App">
      <h1>Counter app</h1>
      <Counter />

      <h2>Todos app</h2>
      <h1>{String(state.value)}</h1>
      <ol>{state.context.todos.map((todo, index) => <li key={index}>
        {todo}
        <button type="button"
          onClick={() => todosActor.send({
            type: "todo.completed",
            todo
          })}
        >Remove</button>
      </li>)}

      </ol>

      <br />
      <button
        onClick={() => todosActor.send({
          type: "todo.added",
          todos: ["Learn xstate5", "fuck"]
        })}
      >
        Add todos
      </button>

      <br />

      <br />

      <input type="text"
        value={id}
        placeholder="Input"
        onChange={(e) => setId(e.target.value)}
      />

      <button type="button"
        onClick={() => {
          fetchUserActor.send({ type: "FETCH", id });
          setId('');
          }}>
        call Api</button>
    </div>
  );
}

export default App;
