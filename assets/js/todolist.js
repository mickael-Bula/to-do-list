import LocalStorage from "./LocalStorage.js";

const app = {
  storage: new LocalStorage(),

  init: function () {
    console.log("app.init()");
    for (const task of app.storage.getTasks()) {
      app.displayListElement(task);
    }

    document.querySelector(".addBtn").addEventListener("click", app.newElement);
    document
      .getElementById("form")
      .addEventListener("submit", app.handleSubmit);
    // Ajout d'un symbole "checked" au clic sur un élément de la liste
    const list = document.querySelector("ul");
    list.addEventListener(
      "click",
      (e) => {
        if (e.target.tagName === "LI") {
          e.target.classList.toggle("checked");
        }
      },
      false
    );
  },

  displayListElement: function (task) {
    const li = document.createElement("LI");
    li.className = "task";
    const content = document.createTextNode(task.content);
    li.appendChild(content);
    li.id = task.id;
    document.getElementById("myUL").appendChild(li);
    // Création d'un bouton de fermeture que l'on ajoute à chacun des éléments de la liste
    app.addCloseBtn(li);
  },

  addCloseBtn: function (element) {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    element.appendChild(span);
    span.addEventListener("click", function () {
      this.parentElement.style.display = "none";
      app.storage.delete(this.parentElement.id);
    });
  },

  // Création d'un nouvel élément au clic sur le bouton "Ajouter"
  newElement: function () {
    const li = document.createElement("LI");
    li.className = "task";
    const inputValue = document.getElementById("myInput").value;
    const content = document.createTextNode(inputValue);
    li.appendChild(content);
    if (inputValue === "") {
      alert("Veuillez saisir une tâche");
    } else {
      document.getElementById("myUL").appendChild(li);
      const task = { content: inputValue };
      // Récupération de l'id retourné par storage.create et insertion dans le DOM
      li.id = app.storage.create(task);
    }
    document.getElementById("myInput").value = "";
    app.addCloseBtn(li);
  },

  // Ajout d'une nouvelle tâche lorsque la touche Entrée est pressée
  handleSubmit: function (event) {
    event.preventDefault();
    app.newElement();
  },
};

document.addEventListener("DOMContentLoaded", app.init);

// TODO : ajouter une propriété isChecked pour gérer l'état de chaque tâche
