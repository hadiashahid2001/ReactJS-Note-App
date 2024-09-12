import React, { createContext, useReducer, useEffect } from 'react';

const NotesContext = createContext();

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [...state, action.payload];
    case 'LOAD_NOTES':
      return action.payload;
    default:
      return state;
  }
};

export const NotesProvider = ({ children }) => {
  const [notes, dispatch] = useReducer(notesReducer, []);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    dispatch({ type: 'LOAD_NOTES', payload: savedNotes });
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
