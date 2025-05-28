import { useState, type ChangeEvent } from "react";
import type { NotesProps } from "../types/notes.type";

const Notes = ( { notes }: NotesProps ) => {
    const [text, setText] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setText(e.target.value);
    };

    return (
        <div className="notes-app">
            <form className="notes-form">
                <textarea 
                    value={text} 
                    onChange={handleChange}
                    placeholder="Введите текст заметки"
                    required
                />
                <button className="add-btn">Добавить</button>
            </form>
            <div className="notes-container">
                {notes.length === 0 ? (
                    <p className="no-notes">Нет записей для отображения!</p>
                ) : notes.map((note) => (
                    <div className="note" key={note.id}>
                        <div className="note-content">{note.content}</div>
                        <span className="delete-note-btn">Х</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notes;