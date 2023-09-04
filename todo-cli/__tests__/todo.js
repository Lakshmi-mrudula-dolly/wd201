/* eslint-disable no-undef */
const todoList = require('../todo');

const {
    all,
    markAsComplete,
    add,
    overdue,     // Import overdue function
    dueToday,    // Import dueToday function
    dueLater     // Import dueLater function
} = todoList();

const formattedDate = d => {
    return d.toISOString().split("T")[0]
  }
  
  var dateToday = new Date()
  const today = formattedDate(dateToday)
  const yesterday = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() - 1))
  )
  const tomorrow = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() + 1))
  )

  
describe("Todolist Test Suite", () => {
    test("Should add new todo", () => {
        expect(all.length).toBe(0);
        add({
            title: 'Task 1',
            dueDate: today, // Due today (not overdue)
            completed: false
        });
        
        add({
            title: 'Task 2',
            dueDate: yesterday, // Due yesterday (overdue)
            completed: false
        });
        
        add({
            title: 'Task 3',
            dueDate: formattedDate(new Date(new Date().setDate(new Date().getDate() + 1))), // Due tomorrow (not overdue)
            completed: true // Completed task (should not be included)
        });
    });

    test("Should mark a today as completed", () => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    });

    test("retrieval of overdue items", () => {

        expect(all[1].dueDate).toBe(yesterday);
        overdue(1);
    });

    test("retrieval of due today items", () => {

        expect(all[0].dueDate).toBe(today);
        dueToday(0);
    });

    test("retrieval of due later items", () => {
    
        expect(all[2].dueDate).toBe(tomorrow);
        dueLater(2);
    });
});
