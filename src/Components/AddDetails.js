import React, { useState } from 'react';
import createDate from '../Components/CreateDate';
import ConfirmationDialog from './ConfirmationDialog';

const AddDetails = ({ details, onDetailChange, onDetailRemove }) => {
  const date = createDate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [detailIdToRemove, setDetailIdToRemove] = useState(null);

  const handleDeleteClick = (id) => {
    setDetailIdToRemove(id);
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDetailRemove(detailIdToRemove); 
    setDialogOpen(false);
    setDetailIdToRemove(null);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDetailIdToRemove(null);
  };

  return (
    <div className='show-details'>
      <div className="card">
        <div className="card-content">
          <input
            type='checkbox'
            className='checkbox'
            checked={details.checked || false}
            onChange={(e) => onDetailChange(details.id, 'checked', e.target.checked)}
            id='check-input'
          />
          <div className={`new-note ${details.checked ? 'line-through1' : ''}`}>
            <input 
              type='text' 
              className='notesInput' 
              placeholder='Enter Notes' 
              value={details.note || ''} 
              onChange={(e) => onDetailChange(details.id, 'note', e.target.value)} 
              disabled={details.checked}
              id='textInput1'
            />
            <span className="date-time">{date}</span>
          </div>
          <div className={`amount ${details.checked ? 'line-through2' : ''}`}>
            <input
              type='text'
              className='notesInput'
              placeholder='Amount'
              value={details.amount || ''}
              onChange={(e) => onDetailChange(details.id, 'amount', e.target.value)}
              disabled={details.checked}
              id='textInput2'
            />
          </div>
          <button 
            type="button" 
            className="close-icon" 
            onClick={() => handleDeleteClick(details.id)}
            aria-label="Delete detail"
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen} 
        onClose={handleCloseDialog} 
        onConfirm={handleConfirmDelete} 
      />
    </div>
  );
};

export default AddDetails;
