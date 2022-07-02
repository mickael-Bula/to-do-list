export default class LocalStorage {
    constructor() {
      this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    }
  
    getTasks() {
      return this.tasks;
    }
  
    getId() {
      if (this.tasks.length === 0) return 0;
      const ids = this.tasks.map((task) => task.id);
      return Math.max(...ids);
    }
  
    nextId() {
      return this.getId() + 1;
    }
  
    create(data) {
      data.id = this.nextId();
      this.tasks.push(data);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      return data.id;
    }
  
    getIndexById(id) {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id === parseInt(id, 10)) {
          return i;
        }
      }
      return -1;
    }
  
    update(data) {
      let index = this.getIndexById(data.id);
      if (index !== -1) {
        this.tasks[index] = data;
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      }
    }
  
    delete(id) {
      let index = this.getIndexById(id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      }
    }
  }
  