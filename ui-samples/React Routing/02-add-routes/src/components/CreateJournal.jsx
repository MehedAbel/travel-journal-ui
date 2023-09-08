import React, { useState } from 'react';
import {styles} from "../styles/styles.js";
import {useNavigate} from "react-router-dom";

const CreateJournal = ({ saveJournal  }) => {
    const [journal, setJournal] = useState({ name: '', budget: '', date: '', description: '' });
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        saveJournal(journal);
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
                        value={journal.name}
                        onChange={(e) => setJournal({ ...journal, name: e.target.value })}
                        style={styles.form.input}

                    />
                </div>

                <div style={styles.form.formGroup}>
                    <label htmlFor='budget' style={styles.form.label}>Budget</label>
                    <input
                        id='budget'
                        type="text"
                        placeholder="Budget"
                        value={journal.budget}
                        onChange={(e) => setJournal({ ...journal, budget: e.target.value })}
                        style={styles.form.input}
                    />
                </div>
                <div style={styles.form.formGroup}>
                    <label htmlFor='date' style={styles.form.label}>Date</label>
                    <input
                        id='date'
                        type="date"
                        placeholder="Date"
                        value={journal.date}
                        onChange={(e) => setJournal({ ...journal, date: e.target.value })}
                        style={styles.form.input}
                    />
                </div>

                <div style={styles.form.formGroup}>
                    <label htmlFor='description' style={styles.form.label}>Description</label>
                    <textarea
                        id='description'
                        placeholder="Description"
                        value={journal.description}
                        onChange={(e) => setJournal({ ...journal, description: e.target.value })}
                        style={styles.form.textarea}
                    />
                </div>
                <button type="submit" style={styles.form.button}>Create</button>
            </form>
        </div>
    )
}

export default CreateJournal;