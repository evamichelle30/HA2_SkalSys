
class Todo {
    constructor(id, date, description, progress) {
        this.id = id;
        this.date = date;
        this.description = description;
        this.progress = progress;
    }
}

function anlegen() {
    var description = document.getElementById("TODO-eingeben").value;
    var date = document.getElementById("datum-eingeben").value;
    var anlegen = new Todo(0, date, description, 0);
    console.log(JSON.stringify(anlegen));
    //hier ein POST request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/todos/", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(anlegen));
    setTimeout(() => { parent.location='index.html'; }, 100);
}

function editieren(id) {
    var description = document.getElementById("TODO-aendern").value;
    var date = document.getElementById("datum-aendern").value;
    var progress = document.getElementById("customRange1").value;
    var editieren = new Todo(id, date, description, progress);
    //hier ein PUT request
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:8080/todos/" + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(editieren));
    setTimeout(() => { parent.location='index.html'; }, 100);
}

function card(id, date, description, progress) {
    return `<div class="ele col-md-6 col-lg-3" id="card` + id + `">
      <div class="card text-white bg-info">
        <div class="card-header" id="date` + id + `">Datum: ` + date +
    `</div>
    <div class="card-body">
      <p class="card-text" id="description` + id + `">` + description +
    `</p>
    <div class="progress" style="height: 20px;">
      <div class="progress-bar" id="progress` + id + `" role="progressbar" style="width: ` + progress + `%;" aria-valuenow="` + progress + `" aria-valuemin="0" aria-valuemax="100">`
    + progress +
    `%</div>
    </div>
    <div class="container">
      <div class="row">
          <button type="button" id="bearbeiten` + id + `" class="btn btn-light card-buttons col-sm-5" onclick="editCard(` + id +`)">bearbeiten</button>
          <button type="button" id="loeschen` + id + `" class="btn btn-light card-buttons col-sm-5 ml-auto" onclick="loeschen(` + id +`)">l??schen</button>
      </div>
  </div>
  </div>
</div>`;
}

function createCards() {
    //hier ein GET request an den server
    var xhr = new XMLHttpRequest();
    var todos;
    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;
    
        if (this.status == 200) {
            todos = JSON.parse(this.responseText);
            for(let i = 0; i < todos.length; i++){
                let id = todos[i].id;
                let date = todos[i].date;
                let description = todos[i].description;
                let progress = todos[i].progress;
                document.getElementById("todo-list").innerHTML += card(id, date, description, progress);
            }
            // we get the returned data
        }
    
        // end of state change: it can be after some time (async)
    };

    xhr.open("GET", "http://localhost:8080/todos/", true);
    xhr.send();

}

function loeschen(id) {
    var description = document.getElementById("description" + id).innerHTML;
    var date = document.getElementById("date" + id).innerHTML.substr(7);
    var progress = document.getElementById("progress" + id).innerHTML.slice(0, -1);
    var loeschen = new Todo(id, date, description, progress);
    //DELETE request
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8080/todos/" + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(loeschen));
    setTimeout(() => { parent.location='index.html'; }, 100);
}

function editCard(id) {
    var date = document.getElementById("date" + id).innerHTML.substr(7);
    var description = document.getElementById("description" + id).innerHTML;
    var progress = document.getElementById("progress" + id).innerHTML.slice(0,-1);
    var editHTML = `<div class="card text-white bg-info">
    <div class="card-header">
        <input class="form-control" type="text" id="datum-aendern" value="` + date + 
        `" aria-label="default input example">
        </div>
        <div class="card-body">
            <textarea class="form-control" id="TODO-aendern" rows="3">` + description + 
            `</textarea>
            <div id="progress">
                <input type="range" class="form-range" value= "` + progress + 
                `" id="customRange1">
                <span>0%</span><span id="edit-hundred">100%</span>                       
            </div>

            <div class="container">
              <div class="row">
                  <button type="button" class="btn btn-light card-buttons col-sm-5" onclick="editieren(` + id + `)">best??tigen</button>
                  <button type="button" class="btn btn-light card-buttons col-sm-5 ml-auto" onclick="parent.location='index.html'">abbrechen</button>
              </div>
        </div>
        </div>
    </div>`
    document.getElementById("card" + id).innerHTML = editHTML;
}