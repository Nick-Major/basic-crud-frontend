import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import type { Note } from "../types/notes.type";
import createRequest from "../api/createRequest";

const Notes = () => {
    const [text, setText] = useState<string>('');
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const API_URL = 'http://localhost:3000/notes';

    const fetchNotes = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await createRequest<never, Note[]>({
                url: API_URL,
                method: 'GET'
            });
            setNotes(data || []);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Ошибка при загрузке заметок';
            setError(message);
            console.error('Fetch notes error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Загрузка заметок при монтировании компонента
    useEffect(() => {
        fetchNotes();
    }, []);

    const handleCreateNote = async (e: FormEvent) => {
        e.preventDefault();
        if (!text.trim()) {
            setError('Текст заметки не может быть пустым');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await createRequest({
                url: API_URL,
                method: 'POST',
                data: { content: text }
            });
            await fetchNotes();
            setText('');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Ошибка при создании заметки';
            setError(message);
            console.error('Create note error:', err);
        }
    };

    const handleDeleteNote = async (id: number) => {
        if (isLoading) return;
        
        setIsLoading(true);
        setError(null);
        try {
            await createRequest({
                url: `${API_URL}/${id}`,
                method: 'DELETE'
            });
            await fetchNotes();
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Ошибка при удалении заметки';
            setError(message);
            console.error('Delete note error:', err);
        }
    };

    const handleRefresh = async () => {
        await fetchNotes();
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        if (error) setError(null);
    };

    return (
        <div className="notes-app">
            <div className="notes-header">
                <h1>Заметки</h1>
                <button 
                    className="refresh-btn"
                    onClick={handleRefresh}
                    disabled={isLoading}
                    title="Обновить заметки"
                >
                    ↻
                </button>
            </div>
            
            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => setError(null)}>×</button>
                </div>
            )}

            <form className="notes-form" onSubmit={handleCreateNote}>
                <textarea 
                    value={text} 
                    onChange={handleChange}
                    placeholder="Введите текст заметки"
                    disabled={isLoading}
                    required
                />
                <button 
                    type="submit" 
                    className="add-btn"
                    disabled={isLoading || !text.trim()}
                >
                    {isLoading ? 'Добавление...' : 'Добавить'}
                </button>
            </form>

            {isLoading && notes.length === 0 ? (
                <div className="loading">Загрузка заметок...</div>
            ) : (
                <div className="notes-container">
                    {notes.length === 0 ? (
                        <p className="no-notes">Нет заметок</p>
                    ) : (
                        notes.map((note) => (
                            <div className="note" key={note.id}>
                                <div className="note-content">{note.content}</div>
                                <button 
                                    className="delete-note-btn"
                                    onClick={() => handleDeleteNote(note.id)}
                                    disabled={isLoading}
                                    title="Удалить заметку"
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Notes;