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
    let list3=[]
     const yesterdayDate=formattedDate(new Date(new Date().setDate(dateToday.getDate()-1)));
    all.forEach(tuple =>{
       // console.log(tuple.dueDate)
        if(tuple.dueDate===yesterdayDate ) list3.push({title:tuple.title,dueDate:tuple.dueDate,completed:tuple.completed});
    })
    return list3;
  }

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    let list2=[]
     const todayDate=formattedDate(new Date());
    all.forEach(tuple =>{
        if(tuple.dueDate===todayDate) list2.push(tuple);
    })
    return list2;
  }

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    const tomorrowDate=formattedDate(new Date(new Date().setDate(dateToday.getDate()+1)));
    let list1=[]
    all.forEach(tuple =>{
        if(tuple.dueDate===tomorrowDate) list1.push(tuple);
    })
    return list1;
  }

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.
    let str="";
    const todayDate=formattedDate(new Date());
    list.forEach(tuple=>{
      let status=tuple.completed?'x':' ';
      if(tuple.dueDate===todayDate) str+=`[${status}] ${tuple.title}`
      else str+=`[${status}] ${tuple.title} ${tuple.dueDate}`;
      str+='\n';
    });
    return str;
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

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

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

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
todos.add({ title: 'Pay rent', dueDate: today, completed: true })
todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })

console.log("My Todo-list\n")

console.log("Overdue")
var overdues = todos.overdue()
var formattedOverdues = todos.toDisplayableList(overdues)
console.log(formattedOverdues)
console.log("\n")

console.log("Due Today")
let itemsDueToday = todos.dueToday()
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
console.log(formattedItemsDueToday)
console.log("\n")

console.log("Due Later")
let itemsDueLater = todos.dueLater()
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
console.log(formattedItemsDueLater)
console.log("\n\n")