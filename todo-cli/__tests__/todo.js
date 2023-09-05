/* eslint-disable no-undef */
const {default :expect}=require("expect");
const todoList = require("../todo");
const {all,markAsComplete,add,overdue,dueToday,dueLater} = todoList();

describe("TodoList Test Suite",() =>{
    beforeAll(() =>{
        const today=new Date();
        const tomorrow = new Date(new Date().setDate(today.getDate()+1));
        expect(all.length).toBe(0);
        add(
            {
                title:"File taxes",
                dueDate:tomorrow.toISOString().slice(0,10),
                completed: false,
            }
        );
        expect(all.length).toBe(1);
    })
    test("Should add new todo", () =>{
        const todoItemsCount=all.length;
        add({
                title:"Service Vehicle",
                dueDate:new Date().toISOString().slice(0,10),
                completed: false,
            });
        expect(all.length).toBe(todoItemsCount+1);
    });
    test("Should mark a todo as complete",() => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    });
    test("Should retrive overdue items", () =>{
        const today=new Date();
        const yesterday = new Date(new Date().setDate(today.getDate()-1));
        const overdueCount=overdue().length;
        add({
                title:"Submit assignment",
                dueDate:yesterday.toISOString().slice(0,10),
                completed: false,
            });
        expect(overdue().length).toBe(overdueCount+1);
    });
    test("Should retrive due today items", () =>{
        const today=new Date();
        const dueTodayCount=dueToday().length;
        add({
                title:"Pay rent",
                dueDate:today.toISOString().slice(0,10),
                completed: true,
            });
        expect(dueToday().length).toBe(dueTodayCount+1);
    });
    test("Should retrive due later items", () =>{
        const today=new Date();
        const tomorrow = new Date(new Date().setDate(today.getDate()+1));
        const duelaterCount=dueLater().length;
        add({
                title:"Pay electric bill",
                dueDate:tomorrow.toISOString().slice(0,10),
                completed: false,
            });
        expect(dueLater().length).toBe(duelaterCount+1);
        console.log(all);
    });
});