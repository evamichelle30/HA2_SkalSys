

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
    //parent.location='index.html';
}

function editieren(id) {
    var description = document.getElementById("TODO-aendern").value;
    var date = document.getElementById("datum-aendern").value;
    var progress = document.getElementById("customRange1").value;
    var editieren = new Todo(id, date, description, progress);
    console.log(JSON.stringify(editieren));
    //parent.location='index.html';
}

function card(id, date, description, progress) {
    return `<div class="ele col-md-6 col-lg-3" id="card` + id + `">
      <div class="card text-white bg-success">
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
          <button type="button" id="loeschen` + id + `" class="btn btn-light card-buttons col-sm-5 ml-auto" onclick="loeschen(` + id +`)">löschen</button>
      </div>
  </div>
  </div>
</div>`;
}

function createCards() {
    var receivedData = '{"todo":[{"id": "13324", "date":"01.03.2020", "description":"Baum fällen", "progress":"80"},{"id": "13524", "date":"19.08.2022", "description":"Zimmer aufräumen", "progress":"20"},{"id": "12324", "date":"11.08.2020", "description":"Bett beziehen", "progress":"0"},{"id": "16324", "date":"11.02.2020", "description":"Nudeln kochen", "progress":"100"}]}';
    var todos = JSON.parse(receivedData);
    for(var i = 0; i < todos.todo.length; i++){
        var id = todos.todo[i].id;
        var date = todos.todo[i].date;
        var description = todos.todo[i].description;
        var progress = todos.todo[i].progress;
        document.getElementById("todo-list").innerHTML += card(id, date, description, progress);
        //console.log(document.getElementById("description13324").innerHTML);
    }
}

function loeschen(id) {
    var description = document.getElementById("description" + id).innerHTML;
    var date = document.getElementById("date" + id).innerHTML.substr(7);
    var progress = document.getElementById("progress" + id).innerHTML.slice(0, -1);
    var loeschen = new Todo(id, date, description, progress);
    console.log(JSON.stringify(loeschen));
}

function editCard(id) {
    var date = document.getElementById("date" + id).innerHTML.substr(7);
    var description = document.getElementById("description" + id).innerHTML;
    var progress = document.getElementById("progress" + id).innerHTML.slice(0,-1);
    editHTML = `<div class="card text-white bg-success">
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
                  <button type="button" class="btn btn-light card-buttons col-sm-5" onclick="editieren(` + id + `)">bestätigen</button>
                  <button type="button" class="btn btn-light card-buttons col-sm-5 ml-auto" onclick="parent.location='index.html'">abbrechen</button>
              </div>
        </div>
        </div>
    </div>`
    document.getElementById("card" + id).innerHTML = editHTML;
}