import { assign, createMachine } from "xstate";

export const todosMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2BXATgOlgFwENM8BiPVCVbAiCSAbQAYBdRUAB1VgEs9vUAdmxAAPRAEYATAA5sANgAsjOZICsAGhABPRAFoAzCuzSA7HP2NJjaftu2TAXwea0WbOUoACGnQhkKVADGqAC27AA2YHgMLMKcPHyCwmIIjJo6qU4uGDgeqJ7BYZHRfnnYmGAhqABuMaxIIPG8-EINKbriqgrGJgoAnH1yltKSknJ9Jul6qn3Y+jJS+gom0qoyNk7OIAIUcMKumHFczUltelaSPf2Dw6Pjk9p6CqqMc2YW4owmjPpdfQpZEAHXCEYhHBItZJ6Pr6bAmSR9cSKQYvKT9KYIXSSKTYVTSPo2PovVaqX6A4F5by0SDgk6tUDtQbYMaqFTzWwIkZ9DEdUY9FSDcZ2b6qck5dwBAqhCJRGkNJqJemic4mN4aR4IUbiYyML7SKSirYUyUVKq1CC0xVQzGSVX6EzqjK-ORzXUrA2bBxAA */
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