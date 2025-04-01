document.addEventListener("DOMContentLoaded", loadNotes);

const addBtn = document.getElementById("add-btn");
const notesContainer = document.getElementById("notes-container");

addBtn.addEventListener("click", function () {
    createNote("");
});

function createNote(content) {
    const note = document.createElement("div");
    note.classList.add("note");
     // Random positioning
    note.style.left = Math.random() * window.innerWidth * 0.7 + "px";
    note.style.top = Math.random() * window.innerHeight * 0.7 + "px";

    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.placeholder = "Write your note...";
    
    // Create delete button (X)
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");

    // Remove note when delete button is clicked
    deleteBtn.addEventListener("click", function () {
        note.remove();
        saveNotes();
    });

    // Save notes when typing
    textarea.addEventListener("input", saveNotes);
    note.addEventListener("mousedown", function (e) {
        let shiftX = e.clientX - note.getBoundingClientRect().left;
        let shiftY = e.clientY - note.getBoundingClientRect().top;
    
        function moveAt(pageX, pageY) {
            note.style.left = pageX - shiftX + "px";
            note.style.top = pageY - shiftY + "px";
            saveNotes();
        }
    
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }
    
        document.addEventListener("mousemove", onMouseMove);
    
        note.addEventListener("mouseup", function () {
            document.removeEventListener("mousemove", onMouseMove);
        });
    
        note.ondragstart = function () {
            return false;
        };
    });
    

    note.appendChild(deleteBtn);
    note.appendChild(textarea);
    notesContainer.appendChild(note);

    saveNotes();
    return note;
}

// Save notes to localStorage
function saveNotes() {
    const notes = [];
    document.querySelectorAll(".note").forEach(note => {
        notes.push({
            content: note.querySelector("textarea").value,
            left: note.style.left || "50px",
            top: note.style.top || "50px"
        });
    });
    localStorage.setItem("notes", JSON.stringify(notes));

}

// Load saved notes
function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach(noteData => {
        const note = createNote(noteData.content);
        if (note) {
            note.style.left = noteData.left;
            note.style.top = noteData.top;
        }
    });
}




