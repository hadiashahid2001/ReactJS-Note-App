import React, { useState, useRef, useEffect } from 'react';
import ConfirmationDialog from './ConfirmationDialog';
import {Share} from '@capacitor/share';

const NoteItem = ({ note, onDelete, isSelecting, isSelected, onSelect }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDeleteClick = () => {
    setDialogOpen(true);
    setDropdownOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(note.id); 
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const shareNote = async () => {
    const text = `${note.title}\n${note.details.map(detail => detail.note).join('\n')}`;
  
    try {
      await Share.share({
        title: note.title,
        text: text,
        dialogTitle: 'Share Note via...',
      });
    } catch (error) {
      console.error('Error sharing note:', error);
    }
  };
  
  

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isDropdownOpen]);

  return (
    <div className='note'>
      <div className='heading-group'>
        <h2>{note.title.length > 40 ? (note.title.substr(0, 40)) + '...' : note.title}</h2>
        <div className="menu" ref={dropdownRef}>
          <button
            className="menu-button"
            aria-label="Toggle dropdown menu"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            &#x22EE;
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <a href="#" onClick={() => onSelect(note.id)}>Select item</a>
              <a href={`/notes/edit-note/${note.id}`}>Edit</a>
              <a href="#" onClick={handleDeleteClick}>Delete</a>
              <a href="#" onClick={shareNote}>Share</a>
            </div>
          )}
        </div>
      </div>
      {note.details && note.details.map(detail => (
        <div key={detail.id} className='note-footer'>
          <input type="checkbox" checked={detail.checked} readOnly name='footer-input1'/>
          <p>{detail.note}</p>
        </div>
      ))}
      {isSelecting && (
        <div>
          <hr/>
        <div className='note-footer'>
          
          <input 
            type="checkbox" 
            checked={isSelected} 
            onChange={() => onSelect(note.id)}
            name='footer-input2'
            className='note-footer-check'
          /> 
          <p className='note-footer-text'>Select</p>
        </div>
        </div>
      )}
      {isDialogOpen && (
        <ConfirmationDialog
          isOpen={isDialogOpen} 
          onClose={handleCloseDialog} 
          onConfirm={handleConfirmDelete} // Only pass deletion logic
        />
      )}
    </div>
  );
};

export default NoteItem;
