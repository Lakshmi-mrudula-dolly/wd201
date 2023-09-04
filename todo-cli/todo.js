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
      if(tuple.dueDate===todayDate) str+=`[${status}] ${tuple.title}\n`
      else str+=`[${status}] ${tuple.title} ${tuple.dueDate}\n`;
      
    });
    str+='\n';
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


module.exports=todoList;