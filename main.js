var currentNote;
var currentTimeout;
var indexer;


function submitNote() {
    var textValue = $("#ReminderText").val();
    var dateValue = $("#Date").val();
    var timeValue = $("#Time").val();
    var id = generateUUID();

    var date = new Date(dateValue + ' ' + timeValue);
    
    if (date <= new Date()) {
        return errorFunction();
    };


    if (dateValue == "" || timeValue == "") {
        return errorFunction();
    }
    var notes = [];
    if (localStorage.getItem("Notes") != null) {
        notes = JSON.parse(localStorage.getItem("Notes"));
    }  

    notes.push({"ID": id,
                "reminderText" : textValue,
                "dateTime" : dateValue,
                "time" : timeValue});
    var notesJSON = JSON.stringify(notes);
    localStorage.setItem("Notes",notesJSON);
    clearTimeout(currentTimeout);
    setTime();
    showNote();
}

function errorFunction() {
    alert("invalid parameters, you must fill all inputs and date must be greater then current date");
};

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


function showNote() {
    var notes = [];
    var parentDiv = document.getElementById("showDiv");
    parentDiv.innerHTML = "";
    if (localStorage.getItem("Notes") != null) {
        notes = JSON.parse(localStorage.getItem("Notes"));

        notes.forEach(element => {
            var showNote = document.createElement("div");
            var noteID = "Note Id : " + element.ID;
            var noteText = "Note Text : " + element.reminderText;
            var noteDate = "Note Time : " + element.dateTime + " " + element.time;
            var noteTextElem = document.createElement("p");
            var noteIDElem = document.createElement("p");
            var noteDateElem = document.createElement("p");
            noteTextElem.innerHTML = noteText;
            noteDateElem.innerHTML = noteDate;
            noteIDElem.innerHTML = noteID;
            showNote.appendChild(noteIDElem);
            showNote.appendChild(noteTextElem);
            showNote.appendChild(noteDateElem);
            showNote.className = "col-3 mx-auto text-warning border";
            parentDiv.appendChild(showNote);
        });
    }  

}

function deleteNote() {
    var noteId = $("#noteId").val();
    if (localStorage.getItem("Notes") != null) {
        var notes = JSON.parse(localStorage.getItem("Notes"));
        var deletedNotes = notes.filter(note => note.ID != noteId);
        var notesJSON = JSON.stringify(deletedNotes);
        if (deletedNotes.length != 0) {
            localStorage.setItem("Notes",notesJSON);
        } else {
            localStorage.removeItem("Notes");
        };
        showNote();
    } 
    clearTimeout(currentTimeout);
    setTime();
}




$(function () {
    setTime();
});






function setTime() {
    var notes;
    if (localStorage.getItem("Notes") != null) {
    notes = JSON.parse(localStorage.getItem("Notes"));

    notes.sort(function (a, b) {
        var dateA = new Date(a.dateTime + ' ' + a.time), dateB = new Date(b.dateTime + ' ' + b.time);
        return dateA - dateB;
    });
    
    currentNote = notes[0];
    console.log(currentNote);
    var date = new Date(currentNote.dateTime + ' ' + currentNote.time);
    var time = date.getTime() - Date.now();
    if (time > 0) {
        currentTimeout = setTimeout(alertFunction, time);
    }
    console.log(date, time);
    }
}

function alertFunction() {
    clearTimeout(currentTimeout);
    var noteId = currentNote.ID;
    if (localStorage.getItem("Notes") != null) {
        var notes = JSON.parse(localStorage.getItem("Notes"));
        var deletedNotes = notes.filter(note => note.ID != noteId);
        var notesJSON = JSON.stringify(deletedNotes);
        if (deletedNotes.length != 0) {
            localStorage.setItem("Notes",notesJSON);
        } else {
            localStorage.removeItem("Notes");
        };
        
    }; 
    alert(currentNote.reminderText);
    setTime();
    showNote();

}



