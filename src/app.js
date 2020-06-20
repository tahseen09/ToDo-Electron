new Vue({
  el: "#app",
  data: {
    todos: [],
    new_todo: "",
  },
  mounted(){
    const electron = require('electron')
    electron.ipcRenderer.on("tasks", (event, tasks) => {
        this.todos = tasks;
    });
  },
  methods: {
    add() {
      obj = {
        title: this.new_todo,
        done: false
      }
      this.todos.push(obj);
      this.new_todo = "";
      const electron = require('electron');
      electron.ipcRenderer.send("tasks", obj);
    },
    delete_item(index) {
      this.todos.splice(index, 1);
      const electron = require('electron');
      electron.ipcRenderer.send("delete", index);
    },
    update(index) {
      const electron = require('electron');
      electron.ipcRenderer.send("task", index);
    }
  },
});
