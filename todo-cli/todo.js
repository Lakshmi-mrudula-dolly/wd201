const todoList = () => {
  all = []
  const add = (todoItem) => {
    all.push(todoItem)
  }
  const markAsComplete = (index) => {
    all[index].completed = true
  }

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.
    const today = new Date().toLocaleDateString("en-CA");
    return all.filter((item) => item.dueDate < today);
  }

  const dueToday = () => {
    const today = new Date().toLocaleDateString("en-CA");
    return all.filter((item) => item.dueDate === today);
  }

  const dueLater = () => {
    const today = new Date().toLocaleDateString("en-CA");
    return all.filter((item) => item.dueDate > today);
  }

  const toDisplayableList = (list) => {
    return list
      .map(
        (todo) =>
          `${todo.completed ? "[x]" : "[ ]"} ${todo.title} ${
            todo.dueDate == today ? "" : todo.dueDate
          }`
      )
      .join("\n");
  }

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList
  };
};
module.exports=todoList;