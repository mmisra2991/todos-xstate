import { assign, createMachine } from "xstate";

export const todosMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2BXATgOlgFwENM8BiPVCVbAiCSAbQAYBdRUAB1VgEs9vUAdmxAAPRAEYATAA5sANgAsjOZICsAGhABPRAFoAzCuzSA7HP2NJjaftu2TAXwea0WbOUoACGnQhkiMHhMrEggnDx8gsJiCLqSJtj6JhraejIJ4gCcmZLipqpOLhg4HqieAMaoALbsADZgeJD+mIHBwuG8-EKhMXEJSSk6senYWTl5yU7OIAIUcMKumO1cnVE9esmJyZpDugqqjFvmltZ29oUgi7iExMsRXdFp-dupsQoZ2bn5F1el3rSQO6rbqgXrxLaDRCmRKMRgmaRSArTX4UMqVGr1RoQIGREGiJ4QnaISS5Yyw+GIn7FdyozyYMBVVAAN0BoQ6uMew2ekIQ+lUchhcIRaimDiAA */
    id: "Tour",
    initial: "start",
    context: {
        todos: [] as string[],
        todo: ""
    },
    states: {
        start: {
            on:{
                'todo.added': {
                    target: "todo added",
                    actions: assign({
                        todos: ({event}) => event.todos
                    })
                }
            }
        },
        "todo added":{
            on:{
                'todo.completed':{
                    target: "todo completed",
                    actions: assign({
                        todos: ({context, event}) => {
                            console.log(context, event)
                            return context.todos.filter((todo: string, index) => todo !== event.todo)
                   }   })
                }
            }
        },
        "todo completed":{
            on: {
                'todo.removed': {
                    target: "todo removed"
                }
            }
        },
        "todo removed": {
            type: 'final',
        },
    }
});