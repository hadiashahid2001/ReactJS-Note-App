import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NoteItem from '../Components/NoteItem';

const Notes = ({ notes, setNotes }) => {
  const [search, setSearch] = useState(false);
  const [text, setText] = useState('');
  const [filterNotes, setFilterNotes] = useState(notes);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);

  const showSearch = () => {
    setFilterNotes(
      notes.filter(note =>
        note.title.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  useEffect(showSearch, [text, notes]);

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    
  };

  const toggleSelectMode = () => {
    setIsSelecting(!isSelecting);
    setSelectedNotes([]);
  };

  const toggleSelectNote = (id) => {
    setSelectedNotes(prev =>
      prev.includes(id) ? prev.filter(noteId => noteId !== id) : [...prev, id]
    );
  };

  const deleteSelectedNotes = () => {
    const updatedNotes = notes.filter(note => !selectedNotes.includes(note.id));
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setIsSelecting(false);
    setSelectedNotes([]);
  };

  const handleImportClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleExportClick = () => {
    document.getElementById('fileInput').click();
  };

  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedNotes = JSON.parse(e.target.result);
          setNotes(prevNotes => {
            const newNotes = [...prevNotes, ...importedNotes];
            localStorage.setItem('notes', JSON.stringify(newNotes));
            return newNotes;
          });
        } catch (error) {
          console.error('Failed to import notes:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  let nav = document.querySelector(".scrolling");
  window.onscroll = function() {
    if (document.documentElement.scrollTop > 20) {
        if (nav) {
            nav.classList.add("scroll-on");
        }
    } else {
        if (nav) {
            nav.classList.remove("scroll-on");
        }
    }

};


  return (
    <div>
      <div className='scrolling'>
        <header className='notes_header'>
          <h2>My Notes</h2>
          <div className="menu">
            <button className="menu-button">&#x22EE;</button>
            <div className="dropdown-menu">
              <a href="#" onClick={toggleSelectMode}>Select item</a>
              <a href="#" onClick={handleImportClick}>Import</a>
              <a href="#" onClick={handleExportClick}>Export</a>
            </div>
          </div>
        </header>
          <div className='search__form '>
            {!search && (
              <input
                type='text'
                value={text}
                onChange={(e) => { setText(e.target.value); }}
                autoFocus
                placeholder='search'
                className='searchInput'
                id='search-Input'
              />
            )}
          </div>
        </div>  
          <div className='mob-sec'>
          <div className='note-container'>
            {filterNotes.map(note => (
              <NoteItem 
                key={note.id} 
                note={note} 
                onDelete={deleteNote} 
                isSelecting={isSelecting} 
                isSelected={selectedNotes.includes(note.id)}
                onSelect={toggleSelectNote} 
              />
            ))}
          </div>
      {isSelecting && <button className='btn' onClick={deleteSelectedNotes}>Delete Selected</button>}
      <Link to='/notes/create-note' className='btn add_btn'>+</Link>
      <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
      </div>
      
    </div>
  );
};

export default Notes;
