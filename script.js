document.addEventListener("DOMContentLoaded", loadNotes);

const addBtn = document.getElementById("add-btn");
const notesContainer = document.getElementById("notes-container");

addBtn.addEventListener("click", function () {
    createNote("");
});

function createNote(content) {
    const note = document.createElement("div");
    note.classList.add("note");

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

    note.appendChild(deleteBtn);
    note.appendChild(textarea);
    notesContainer.appendChild(note);

    saveNotes();
}

// Save notes to localStorage
function saveNotes() {
    const notes = [];
    document.querySelectorAll(".note textarea").forEach(note => {
        notes.push(note.value);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Load saved notes
function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach(content => createNote(content));
}
