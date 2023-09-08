import React, {useState, useEffect, useContext} from 'react';
import {styles} from "../styles/styles.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import {JournalContext} from "../context/JournalContext.jsx";

const EditJournal = () => {
    const { journals, saveJournal} = useContext(JournalContext);
    const { id } = useParams();
    const journalToEdit = journals.find(j => j.id === Number(id));

    const [updatedJournal, setJournal] = useState(journalToEdit);
    const navigate = useNavigate();

    useEffect(() => {
        setJournal(journalToEdit);
    }, [journalToEdit])
    const handleSubmit = (e) => {
        e.preventDefault();

        saveJournal(updatedJournal);
        navigate('/')
    }
    return (
        <div style={styles.form.container}>
            <form onSubmit={handleSubmit}>
                <div style={styles.form.formGroup}>
                    <label htmlFor='name' style={styles.form.label}>Name</label>
                    <input
                        id='name'
                        type="text"
                        placeholder="Name"
                        value={updatedJournal.name}
                        onChange={(e) => setJournal({ ...updatedJournal, name: e.target.value })}
                        style={styles.form.input}

                    />
                </div>

                <div style={styles.form.formGroup}>
                    <label htmlFor='budget' style={styles.form.label}>Budget</label>
                    <input
                        id='budget'
                        type="text"
                        placeholder="Budget"
                        value={updatedJournal.budget}
                        onChange={(e) => setJournal({ ...updatedJournal, budget: e.target.value })}
                        style={styles.form.input}
                    />
                </div>

                <div style={styles.form.formGroup}>
                    <label htmlFor='description' style={styles.form.label}>Description</label>
                    <textarea
                        id='description'
                        placeholder="Description"
                        value={updatedJournal.description}
                        onChange={(e) => setJournal({ ...updatedJournal, description: e.target.value })}
                        style={styles.form.textarea}
                    />
                </div>
                <button type="submit" style={styles.form.button}>Edit</button>
                <br/>
                <Link to='/'>Cancel</Link>
            </form>
        </div>
    )
}

export default EditJournal;