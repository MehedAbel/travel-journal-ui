import './index.css';
import delete_button from '../../assets/delete_button.svg';
import edit from '../../assets/edit.svg';
import React, { useState, useEffect } from 'react';
import DeleteNote from './DeleteNote.jsx';
import { API_URL } from '../../config.js';

const NoteDataGrid = (travelId) => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState(null);

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
                            <tr key={note.id}>
                                <td>
                                    <a href="#">{note.name}</a>
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
                                            onClick={(event) => showModal(event, note)}>
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
            {note != null && (
                <DeleteNote
                    noteName={note.name}
                    onDelete={deleteNote}
                    onCancel={cancel}></DeleteNote>
            )}
        </div>
    );
};

export default NoteDataGrid;
