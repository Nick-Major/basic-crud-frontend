import Notes from './components/Notes';
import type { Note } from './types/notes.type';
import './App.css';

function App() {
  const initialNotes: Note[] = [
    { id: 1, content: "Первая заметка" },
    { id: 2, content: "Вторая заметка" }
  ];

  return (
    <Notes notes={initialNotes} />
  );
}

export default App;
