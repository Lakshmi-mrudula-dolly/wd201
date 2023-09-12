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
    /*static associate(models) {
      // define association here
      Todo.belongsTo(models.User,{
        foreignKey:"userId",
      });
    }*/

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