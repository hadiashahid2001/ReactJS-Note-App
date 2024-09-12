import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Notes from './Pages/Notes';
import CreateNote from './Pages/CreateNote';
import EditNote from './Pages/EditNote';
import SplashScreen from './Pages/SplashScreen';
import './App.css';

const App = () => {
  const [note, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(note));
  }, [note]);

  return (
    <main id='mobile-section'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<SplashScreen />} />
        <Route path='/notes' element={<Notes notes={note} setNotes={setNotes} />} />
        <Route path='/notes/create-note' element={<CreateNote setNotes={setNotes} />} />
        <Route path='/notes/edit-note/:id' element={<EditNote notes={note} setNotes={setNotes} />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
    </main>
  );
};

export default App;
