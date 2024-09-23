document.addEventListener('DOMContentLoaded', function() {
    // Show specific section
    function showSection(sectionId) {
        const sections = ['userInfoSection', 'takingNotesSection', 'archivedNotesSection', 'deletedNotesSection'];
        sections.forEach(id => {
            document.getElementById(id).style.display = id === sectionId ? 'block' : 'none';
        });
    }

    // Show the appropriate section when clicking sidebar links
    document.getElementById('userInfoLink').addEventListener('click', function() {
        showSection('userInfoSection');
        loadUserInfo(); // Load user info when switching to User Info
    });

    document.getElementById('takingNotesLink').addEventListener('click', function() {
        showSection('takingNotesSection');
        loadNotes(); // Load saved notes when switching to Taking Notes
    });

    document.getElementById('archivedNotesLink').addEventListener('click', function() {
        showSection('archivedNotesSection');
        loadArchivedNotes(); // Load archived notes when switching to Archived Notes
    });

    document.getElementById('deletedNotesLink').addEventListener('click', function() {
        showSection('deletedNotesSection');
        loadDeletedNotes(); // Load deleted notes when switching to Deleted Notes
    });

    // Open Note Popup
    document.getElementById('openNotePopup').addEventListener('click', function() {
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
            <div class="popup-content">
                <h2>New Note</h2>
                <label for="noteTitle">Title:</label>
                <input type="text" id="noteTitle" placeholder="Enter note title">
                <label for="noteBody">Body:</label>
                <textarea id="noteBody" placeholder="Enter note body"></textarea>
                <label for="notePriority">Priority:</label>
                <select id="notePriority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <div class="toolbar">
                    <button onclick="document.execCommand('bold', false, null)">Bold</button>
                    <button onclick="document.execCommand('underline', false, null)">Underline</button>
                    <button onclick="document.execCommand('italic', false, null)">Italic</button>
                    <select onchange="document.execCommand('fontSize', false, this.value)">
                        <option value="3">Normal</option>
                        <option value="4">Large</option>
                        <option value="5">Huge</option>
                    </select>
                    <button onclick="document.execCommand('foreColor', false, prompt('Enter color code (e.g., #ff0000):'))">Font Color</button>
                    <button onclick="document.execCommand('fontName', false, prompt('Enter font name (e.g., Arial):'))">Font</button>
                </div>
                <button id="saveNote">Save Note</button>
                <button id="closePopup">Close</button>
            </div>
        `;
        document.body.appendChild(popup);

        document.getElementById('saveNote').addEventListener('click', function() {
            const title = document.getElementById('noteTitle').value;
            const body = document.getElementById('noteBody').value;
            const priority = document.getElementById('notePriority').value;
            saveNoteToLocalStorage(title, body, priority);
            document.body.removeChild(popup);
            loadNotes(); // Refresh the notes list
        });

        document.getElementById('closePopup').addEventListener('click', function() {
            document.body.removeChild(popup);
        });
    });

    // Save Note to Local Storage
    function saveNoteToLocalStorage(title, body, priority) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({
            title,
            body,
            priority,
            timestamp: new Date().toLocaleString()
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Load Notes
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const priorityFilter = document.getElementById('priorityFilter') ? document.getElementById('priorityFilter').value : '';
        const filteredNotes = priorityFilter ? notes.filter(note => note.priority === priorityFilter) : notes;

        const notesList = document.getElementById('notesList');
        if (notesList) {
            notesList.innerHTML = '';

            filteredNotes.forEach(note => {
                const noteItem = document.createElement('li');
                noteItem.classList.add(`priority-${note.priority}`);
                noteItem.innerHTML = `
                    <h3>${note.title}</h3>
                    <div class="note-content">${note.body}</div>
                    <small>Created at: ${note.timestamp}</small>
                    <button onclick="archiveOrDeleteNote('${note.title}', 'delete')">Delete</button>
                    <button onclick="archiveOrDeleteNote('${note.title}', 'archive')">Archive</button>
                `;
                notesList.appendChild(noteItem);
            });
        }
    }

    // Event listener for filter change
    const priorityFilter = document.getElementById('priorityFilter');
    if (priorityFilter) {
        priorityFilter.addEventListener('change', function() {
            loadNotes(); // Reload notes based on the filter value
        });
    }

    // Archive or Delete Note
    window.archiveOrDeleteNote = function(title, action) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        const noteToModify = notes.find(note => note.title === title);

        if (action === 'archive') {
            let archivedNotes = JSON.parse(localStorage.getItem('archivedNotes')) || [];
            archivedNotes.push(noteToModify);
            localStorage.setItem('archivedNotes', JSON.stringify(archivedNotes));
        } else if (action === 'delete') {
            let deletedNotes = JSON.parse(localStorage.getItem('deletedNotes')) || [];
            deletedNotes.push(noteToModify);
            localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes));
        }

        // Remove the note from current notes
        notes = notes.filter(note => note.title !== title);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes(); // Refresh the notes list
        loadArchivedNotes(); // Refresh the archived notes list
        loadDeletedNotes(); // Refresh the deleted notes list
    };

    // Load Archived Notes
    function loadArchivedNotes() {
        const archivedNotesList = document.getElementById('archivedNotesList');
        const archivedNotes = JSON.parse(localStorage.getItem('archivedNotes')) || [];
        if (archivedNotesList) {
            archivedNotesList.innerHTML = '';

            archivedNotes.forEach(note => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <h3>${note.title}</h3>
                    <div class="note-content">${note.body}</div>
                    <small>Archived at: ${note.timestamp}</small>
                    <button onclick="restoreNoteFromArchive('${note.title}')">Restore</button>
                `;
                archivedNotesList.appendChild(li);
            });
        }
    }

    // Load Deleted Notes
    function loadDeletedNotes() {
        const deletedNotesList = document.getElementById('deletedNotesList');
        const deletedNotes = JSON.parse(localStorage.getItem('deletedNotes')) || [];
        if (deletedNotesList) {
            deletedNotesList.innerHTML = '';

            deletedNotes.forEach(note => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <h3>${note.title}</h3>
                    <div class="note-content">${note.body}</div>
                    <small>Deleted at: ${note.timestamp}</small>
                    <button onclick="restoreNoteFromDelete('${note.title}')">Restore</button>
                `;
                deletedNotesList.appendChild(li);
            });
        }
    }

    // Restore Note from Archive
    window.restoreNoteFromArchive = function(title) {
        let archivedNotes = JSON.parse(localStorage.getItem('archivedNotes')) || [];
        const noteToRestore = archivedNotes.find(note => note.title === title);

        // Remove from archived notes
        archivedNotes = archivedNotes.filter(note => note.title !== title);
        localStorage.setItem('archivedNotes', JSON.stringify(archivedNotes));

        // Add back to notes
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteToRestore);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes(); // Refresh the notes list
        loadArchivedNotes(); // Refresh the archived notes list
    };

    // Restore Note from Delete
    window.restoreNoteFromDelete = function(title) {
        let deletedNotes = JSON.parse(localStorage.getItem('deletedNotes')) || [];
        const noteToRestore = deletedNotes.find(note => note.title === title);

        // Remove from deleted notes
        deletedNotes = deletedNotes.filter(note => note.title !== title);
        localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes));

        // Add back to notes
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteToRestore);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes(); // Refresh the notes list
        loadDeletedNotes(); // Refresh the deleted notes list
    };

    // Load User Info
    function loadUserInfo() {
        const userInfoContent = document.getElementById('userInfoContent');
        // Example user data; replace with actual data source
        const userData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            registered: new Date().toLocaleString()
        };
        userInfoContent.innerHTML = `
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Registered:</strong> ${userData.registered}</p>
        `;
    }

    // Logout Functionality
    document.getElementById('logoutButton').addEventListener('click', function() {
        // Clear user session data if needed
        localStorage.removeItem('user'); // Example for clearing user data
        // Redirect to login page
        window.location.href = 'login.html';
    });

    // Initial load
    loadNotes(); // Load notes when the page loads
    loadArchivedNotes(); // Load archived notes when the page loads
    loadDeletedNotes(); // Load deleted notes when the page loads
});
