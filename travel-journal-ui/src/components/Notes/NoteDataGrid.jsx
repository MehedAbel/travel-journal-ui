import './index.css';
import delete_button from '../../assets/delete_button.svg';
import edit from '../../assets/edit.svg';
import React, { useState, useEffect } from 'react';
import DeleteNote from './DeleteNote.jsx';
import ViewNote from './ViewNote/ViewNote.jsx';
import { API_URL } from '../../config.js';

const NoteDataGrid = (travelId) => {
    const [notes, setNotes] = useState([
        // for testing purposes
        {
            id: 1,
            name: 'Test Note',
            date: '01 / 02 / 2021',
            description: 'Test Description',
            images: [
                'https://source.unsplash.com/random/1000x1000?sig=1',
                'https://source.unsplash.com/random/1000x1000?sig=2',
                'https://source.unsplash.com/random/1000x1000?sig=3',
                'https://source.unsplash.com/random/1000x1000?sig=4',
                'https://source.unsplash.com/random/1000x1000?sig=5',
                'https://source.unsplash.com/random/1000x1000?sig=6',
                'https://source.unsplash.com/random/1000x1000?sig=7'
            ]
        }
    ]);
    const [note, setNote] = useState(null);
    const [isViewNoteOpen, setIsViewNoteOpen] = useState(false);
    const [isDeleteNoteOpen, setIsDeleteNoteOpen] = useState(false);

    const token = localStorage.getItem('token');
    const tokenType = localStorage.getItem('tokenType');

    const deleteNote = async () => {
        try {
            const response = await fetch(`${API_URL}/travel-journal/deleteNote/${note.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `${tokenType} ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setNote(null);
            await fetchNotes();
        } catch (error) {
            console.error('Error deleting the ' + note.name + ' note: ', error);
        }
    };

    const cancel = () => {
        setNote(null);
        setIsDeleteNoteOpen(false);
    };

    const showModal = (event, note) => {
        setNote(note);
    };

    const fetchNotes = async () => {
        try {
            //todo: get notes list
            const response = await fetch(
                `${API_URL}/travel-journal/travel/${travelId}/view-notes`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `${tokenType} ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    useEffect(() => {
        fetchNotes().then();
    }, []);

    return (
        <div className="data-grid">
            {notes.length > 0 ? ( // new
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
                            <tr key={note.id}>
                                <td>
                                    <a
                                        href="#"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setIsViewNoteOpen(true);
                                            showModal(event, note);
                                        }}>
                                        {note.name}
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
                    noteName={note.name}
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
