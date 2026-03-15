import { setup, fromPromise, assign, createActor } from 'xstate';

// 1. Logic now accepts "input" from the machine
const fetchTodoById = fromPromise(async ({ input }: { input: { id: number } }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${input.id}`);
  if (!response.ok) throw new Error('Todo not found');
  const data = await response.json();
  console.log("data: ", data);
  return data;
});

// 2. Setup the Machine
export const fetchUserMachine = setup({
  types: {
    context: {} as { todos: any[]; error: string | null },
    events: {} as { type: 'FETCH' } | { type: 'RETRY' }
  },
  actors: {
    fetchTodoById
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUFkCGBjAFgJYB2YAdIRADZgDEAYgKIAqAwgBIDaADALqKgADqliFkhVMQEgAHogC0AJgAcAFjKKAnADZlAdgCsAGhABPBQYPKy27au7bFBgL7OTaDDgIlyVVNggSKFoMUgpiADdUAGtyDyw8IjC-AKCEEijcbHFJHl486WFRHKkkWQV7RTJVRQBGfWMzBT0HMlruTQBmQ1d3dATvZP9A4mCwACdx1HGyQSpsgDNpgFsyeK8k32G0jNQskryCsqKxCVLQOQRlaxVNBycTcwR5PW1OsmU7xxc3EHXEnxkWAAV1wuDgsAYLA4RyEIlOkmkl3knU06j0NXqhkeFT071u9x+fU8ALCC2whCowPGdAASixaQBNWEgE4lJG49QE74455WbhtOyE1y-YjoODSf6DMCFeHssrIgyKKrch5NZ7KAy1Mio4W-KWbCjUGXHOVnDnPFRcnQNXko+o2IXfXp-fobQEpEZQWXFc0KxC1RTaap1W3q+S1Ax6MgtTqBomuknSoGg8GweCm32I-2WtQaG3Y8NVWz2Z36t2k8jkynUk1wrPncq5626QtPWpxj6dAxdHoioA */
  id: 'todoMachine',
  types:{
    context: {} as {todos: any[]; error: string | null},
    events: {} as {type: 'FETCH'} | {type: 'RETRY'}
  },
  actors: {
    fetchTodoById
  },
  context: {
    todos: [],
    error: null
  },
  initial: 'idle',
  states: {
    idle: {
      on: { FETCH: 'loading' }
    },
    loading: {
      invoke: {
        input: ({ event }) => ({ id: (event as any).id }),
        src: 'fetchTodoById',
        onDone: {
          target: 'success',
          actions: assign({
            todos: ({ event }) => event.output // event.output is the JSON response
          })
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: ({ event }) => (event.error as Error).message
          })
        }
      }
    },
    success: {
      on: { FETCH: 'loading' } // Allow fetching again
    },
    failure: {
      on: { RETRY: 'loading' }
    }
  }
});