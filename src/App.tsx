import { todosMachine } from "./machines/todosMachine";
import { createActor, } from "xstate";
import { useSelector} from "@xstate/react";
import Counter from "./components/Counter";

const todosActor = createActor(todosMachine).start();

function App() {
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
    </div>
  );
}

export default App;
