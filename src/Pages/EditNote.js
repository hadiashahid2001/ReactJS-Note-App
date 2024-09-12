import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import AddDetails from '../Components/AddDetails';

const EditNote = ({ notes, setNotes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const noteToEdit = notes.find(note => note.id === id) || {};
  const [title, setTitle] = useState(noteToEdit.title || '');
  const [details, setDetails] = useState(noteToEdit.details?.filter(detail => !detail.checked) || []);
  const [checkedDetails, setCheckedDetails] = useState(noteToEdit.details?.filter(detail => detail.checked) || []);
  const [totalSum, setTotalSum] = useState(0);
  const [archivedSum, setArchivedSum] = useState(0);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    const total = details.reduce((acc, detail) => acc + (parseFloat(detail.amount) || 0), 0);
    const archived = checkedDetails.reduce((acc, detail) => acc + (parseFloat(detail.amount) || 0), 0);

    setTotalSum(total);
    setArchivedSum(archived);
  }, [details, checkedDetails]);

  const addDetails = () => {
    setDetails([...details, { id: uuid(), checked: false, note: '', amount: '' }]);
  };

  const handleDetailChange = (id, field, value) => {
    if (field === 'checked') {
      if (value) {
        const movingDetail = details.find(detail => detail.id === id);
        setDetails(prevDetails => prevDetails.filter(detail => detail.id !== id));
        setCheckedDetails([...checkedDetails, { ...movingDetail, [field]: value }]);
      } else {
        const movingDetail = checkedDetails.find(detail => detail.id === id);
        setCheckedDetails(prevDetails => prevDetails.filter(detail => detail.id !== id));
        setDetails([...details, { ...movingDetail, [field]: value }]);
      }
    } else {
      setDetails(prevDetails =>
        prevDetails.map(detail =>
          detail.id === id ? { ...detail, [field]: field === 'amount' ? parseFloat(value) || 0 : value } : detail
        )
      );
      setCheckedDetails(prevDetails =>
        prevDetails.map(detail =>
          detail.id === id ? { ...detail, [field]: field === 'amount' ? parseFloat(value) || 0 : value } : detail
        )
      );
    }
  };

  const handleDetailRemove = (id) => {
    setDetails(prevDetails => prevDetails.filter(detail => detail.id !== id));
    setCheckedDetails(prevDetails => prevDetails.filter(detail => detail.id !== id));
  };

  const toggleArchived = () => {
    setShowArchived(!showArchived);
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (title) {
      const updatedNote = {
        id: noteToEdit.id,
        title,
        details: [...details, ...checkedDetails],
      };
      setNotes(prevNotes => {
        const newNotes = prevNotes.map(note => note.id === id ? updatedNote : note);
        localStorage.setItem('notes', JSON.stringify(newNotes));
        return newNotes;
      });
      navigate('/notes');
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
    <section>
      <header className='create-note_header'>
        <Link to='/notes' className='arrowbtn'><i className="fa-solid fa-arrow-left"></i></Link>
        <button className='btn primary save-button' onClick={submitForm}>Save</button>
      </header>
      <div className='mob-sec'>
        <form className='create-note__form' onSubmit={submitForm}>
          <input type='text' placeholder='Title' className='formInput' 
            value={title} onChange={e => setTitle(e.target.value)} id='sec-form-input'/>
        </form>
        <h5 className='d-flex mt-4'>Sum: <p>{totalSum}</p></h5>
        {details.map(detail => (
          <AddDetails key={detail.id} details={detail} onDetailChange={handleDetailChange} onDetailRemove={handleDetailRemove} />
        ))}
        <button className='hide_details' onClick={toggleArchived}>{showArchived ? 'Hide Archived' : 'Show Archived'}</button>
        {showArchived && (
          <>
            <h5 className='d-flex mt-4'>Sum: <p>{archivedSum}</p></h5>
            <div className='target_id'>
              {checkedDetails.map(detail => (
                <AddDetails key={detail.id} details={detail} onDetailChange={handleDetailChange} onDetailRemove={handleDetailRemove}/>
              ))}
            </div>
          </>
        )}
        <button className='btn add_detail' onClick={addDetails}>+</button>
      </div>
    </section>
  );
};

export default EditNote;
