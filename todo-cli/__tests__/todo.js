/* eslint-disable no-undef */
const todoList = require('../todo');
const { default: expect } = require("expect");
const {
    all,
    markAsComplete,
    add,
    overdue,     // Import overdue function
    dueToday,    // Import dueToday function
    dueLater     // Import dueLater function
} = todoList();
 
describe("Todolist Test Suite", () => {
    beforeAll(() => {
        const today = new Date();
        const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
        expect(all.length)
.toBe(0);
        add({
            title: "File taxes",
            dueDate: tomorrow.toISOString().slice(0,10),
            completed:false,
        });
    expect(all.length).toBe(1);
    });
    test("Should add new todo", () => {
        const todoit = all.length;
        add({
            title: 'Task 1',
            dueDate: new Date().toISOString().slice(0, 10), // Due today (not overdue)
            completed: false,
        });
        expect(all.length).toBe(todoit+1);
    });

    test("Should mark a today as completed", () => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    });

    test("retrieval of overdue items", () => {
        const today = new Date();
        const yesterday = new Date(new Date().setDate(today.getDate() - 1));
        const overdueCount = overdue().length;
        add({
            title: "assignment",
            dueDate: yesterday.toISOString().slice(0, 10),
            completed: false,
          });
        expect(overdue().length).toBe(overdueCount+1);
    });

    test("retrieval of due today items", () => {

        const today = new Date();
    const dueTodayCount = dueToday().length;
    add({
      title: "rent",
      dueDate: today.toISOString().slice(0, 10),
      completed: true,
    });
    expect(dueToday().length).toBe(dueTodayCount + 1);
    });

    test("retrieval of due later items", () => {
    
        const today = new Date();
        const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
        const dueLatreCount = dueLater().length;
        add({
          title: "Pay bill",
          dueDate: tomorrow.toISOString().slice(0, 10),
          completed: false,
        });
        expect(dueLater().length).toBe(dueLatreCount + 1);
    });
});
