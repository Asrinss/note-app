import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import SortSelector from './components/SortSelector';

const App = () => {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			title: 'First Note',
			text: 'Hello Word',
			date: '03/04/2024',
			favorite: false,
			category: 'General',
		},
	]);

	const [searchText, setSearchText] = useState('');
	const [darkMode, setDarkMode] = useState(false);
	const [currentCategory, setCurrentCategory] = useState('All');
	const [sortBy, setSortBy] = useState('date');

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const addNote = (title, text, category) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			title:title,
			text: text,
			date: date.toLocaleDateString(),
			favorite: false,
      		category: category,
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	const editNote = (id, title, text, category) => {
		const updatedNotes = notes.map((note) =>
			note.id === id ? { ...note, title, text, category } : note
		);
		setNotes(updatedNotes);
	};

	const toggleFavorite = (id) => {
		const updatedNotes = notes.map((note) =>
			note.id === id ? { ...note, favorite: !note.favorite } : note
		);
		setNotes(updatedNotes);
	};

	const sortNotes = (notesToSort) => {
		switch (sortBy) {
		  case 'date':
			return notesToSort.sort((a, b) => new Date(b.date) - new Date(a.date));
		  case 'favorite':
			return notesToSort.sort((a, b) => b.favorite - a.favorite);
		  case 'alphabetical':
			return notesToSort.sort((a, b) => a.title.localeCompare(b.title));
		  default:
			return notesToSort;
		}
	  };

	  const filteredNotes = notes
    .filter((note) =>
      (note.text.toLowerCase().includes(searchText.toLowerCase()) ||
      note.title.toLowerCase().includes(searchText.toLowerCase())) &&
      (currentCategory === 'All' || note.category === currentCategory)
    );

  	const sortedNotes = sortNotes(filteredNotes);


  const exportNotes = () => {
    const dataStr = JSON.stringify(notes);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'notes.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importNotes = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const importedNotes = JSON.parse(e.target.result);
      setNotes(importedNotes);
    };
    reader.readAsText(file);
  };


	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} exportNotes={exportNotes} importNotes={importNotes} />
				<Search handleSearchNote={setSearchText} />
				<CategorySelector 
          			currentCategory={currentCategory} 
          			setCurrentCategory={setCurrentCategory} 
        		/>
        		<SortSelector sortBy={sortBy} setSortBy={setSortBy} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText) ||
						note.title.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
					handleEditNote={editNote}
					handleToggleFavorite={toggleFavorite}
				/>
			</div>
		</div>
	);
};

export default App;