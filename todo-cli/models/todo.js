/*'use strict';
const {
  Model,Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
/*    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const todos1 = await Todo.overdue();
      const todoList1 = todos1.map(todo => todo.displayableString()).join("\n");
      console.log(todoList1);
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const todos = await Todo.dueToday();
      const todoList = todos.map(todo => todo.displayableString1()).join("\n");
      console.log(todoList);
      console.log("\n");
      console.log("Due Later");
      // FILL IN HERE
      const todos2 = await Todo.dueLater();
      const todoList2 = todos2.map(todo => todo.displayableString()).join("\n");
      console.log(todoList2);
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      return this.findAll({
        where:{
          dueDate:{
            [Op.lt]: new Date(),
          },
        },
      });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      return Todo.findAll({
        where:{
          dueDate:{
            [Op.eq]:new Date(),
          },
        },
      });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      return Todo.findAll({
        where:{
          dueDate:{
            [Op.gt]:new Date(),
          },
        },
      });
    }
    static async completed(userId){
      return this.findAll({
        where:{
          completed:false,
          userId,
        },
      });
    }
    static async markAsCompleted(){
      return this.update({completed:true});
    }

    setCompletionStatus(completed) {
      return this.update({completed});
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
    displayableString1() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title}`;
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};*/
// models/todo.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     
     static async addTask(params) {
      return  await Todo.create(params);
    }*/
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User,{
        foreignKey:"userId",
      });
    }

    static addTodo({title,dueDate,userId}){
      return this.create({
        title:title,
        dueDate:dueDate,
        completed:false,
        userId,
      });
    }

    static async overdue(userId){
      return this.findAll({
        where:{
          dueDate:{
            [Op.lt]: new Date(),
          },
          completed:false,
          userId,
        },
      });
    }

    static async dueLater(userId){
      return this.findAll({
        where:{
          dueDate:{
            [Op.gt]: new Date(),
          },
          completed:false,
          userId,
        },
      });
    }

    static async dueToday(userId){
      return this.findAll({
        where:{
          dueDate:{
            [Op.eq]: new Date(),
          },
          completed:false,
          userId,
        },
      });
    }

    static async completed(userId){
      return this.findAll({
        where:{
          completed:false,
          userId,
        },
      });
    }

    static async remove(id,userId){
      return this.destroy({
        where:{
          id,
          userId,
        },
      });
    }
    markAsCompleted(){
      return this.update({completed:true});
    }

    setCompletionStatus(completed) {
      return this.update({completed});
    }
        /*displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }*/
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
