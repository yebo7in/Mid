import React, { useState } from 'react';

function Notes() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Note 1', content: 'This is the first note.' },
    { id: 2, title: 'Note 2', content: 'This is the second note.' },
  ]);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
