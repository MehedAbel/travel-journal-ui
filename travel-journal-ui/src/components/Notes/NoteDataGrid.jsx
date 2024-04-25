import './index.css';
import delete_button from '../../assets/delete_button.svg';
import edit from '../../assets/edit.svg';
import React, { useEffect, useState } from 'react';
import DeleteNote from './DeleteNote.jsx';
import ViewNote from './ViewNote/ViewNote.jsx';
import { API_URL } from '../../config.js';

const NoteDataGrid = ({ notesList }) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        setNotes(notesList ?? []);
    }, [notesList]);

    const [note, setNote] = useState(null);
    const [isViewNoteOpen, setIsViewNoteOpen] = useState(false);
    const [isDeleteNoteOpen, setIsDeleteNoteOpen] = useState(false);

    const token = localStorage.getItem('token');
    const tokenType = localStorage.getItem('tokenType');

    const deleteNote = async () => {
        try {
            const response = await fetch(`${API_URL}/travel-journal/deleteNote/${note.noteId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `${tokenType} ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setNote(null);
            setNotes(notes.filter((n) => n.noteId !== note.noteId));
        } catch (error) {
            console.error('Error deleting the ' + note.destinationName + ' note: ', error);
        }
    };

    const cancel = () => {
        setNote(null);
        setIsDeleteNoteOpen(false);
    };

    const showModal = (event, note) => {
        setNote(note);
    };

    return (
        <div className="data-grid">
            {notes.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Description & Itinerary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map((note) => (
                            <tr key={note.noteId}>
                                <td>
                                    <a
                                        href="#"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setIsViewNoteOpen(true);
                                            showModal(event, note);
                                        }}>
                                        {note.destinationName}
                                    </a>
                                </td>
                                <td>{note.date}</td>
                                <td>{note.description}</td>
                                <td>
                                    <div className="align">
                                        <button className="btn button-container">
                                            <img src={edit} alt="edit" />
                                        </button>
                                        <button
                                            className="btn button-container"
                                            onClick={(event) => {
                                                setIsDeleteNoteOpen(true);
                                                showModal(event, note);
                                            }}>
                                            <img src={delete_button} alt="delete" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No notes available yet</p>
            )}
            {note != null && isDeleteNoteOpen && (
                <DeleteNote
                    noteName={note.destinationName}
                    onDelete={deleteNote}
                    onCancel={cancel}></DeleteNote>
            )}
            {note != null && isViewNoteOpen && (
                <ViewNote note={note} onClose={() => setIsViewNoteOpen(false)} />
            )}
        </div>
    );
};

export default NoteDataGrid;
