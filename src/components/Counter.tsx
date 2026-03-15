import { useActorRef, useSelector } from "@xstate/react";
import { createActor, fromTransition } from "xstate";

const countLogic = fromTransition((state, event) => {
    if(event.type ==='inc'){
        return {count: state.count + 1}
    }
    return state;
}, {count: 0});

const countActor = createActor(countLogic);
countActor.start();

export default function Counter() {
// const countRef = useActorRef(countLogic);
// const count = countRef.getSnapshot().context.count;
// const count = useSelector(countRef, (state) => state.context.count);

const state = useSelector(countActor, (snap) => snap);
  return (
    <>
    <div>Count: {state.context.count}</div>

    <button
        onClick={() =>  countActor.send({type: 'inc'})}
    >Inc</button>
    </>
  )
}
