import { useState } from 'react';

const AddNote = ({ handleAddNote }) => {
	const [noteTitle, setNoteTitle] = useState('');
	const [noteText, setNoteText] = useState('');
	const [noteCategory, setNoteCategory] = useState('General');
	const characterLimit = 150;

	const handleTitleChange = (event) => {
		setNoteTitle(event.target.value);
	};

	const handleChange = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setNoteText(event.target.value);
		}
	};

	const handleSaveClick = () => {
		if (noteTitle.trim().length > 0 && noteText.trim().length > 0) {
			handleAddNote(noteTitle, noteText, noteCategory);
			setNoteTitle('');
			setNoteText('');
			setNoteCategory('General');
		}
	};

	return (
		<div className='note new'>
			<input
				type='text'
				placeholder='Enter note title...'
				value={noteTitle}
				onChange={handleTitleChange}
			/>
			<textarea
				rows='8'
				cols='10'
				placeholder='Type to add a note...'
				value={noteText}
				onChange={handleChange}
			></textarea>
			<select
        		value={noteCategory}
        		onChange={(e) => setNoteCategory(e.target.value)}
      		>
        		<option value="General">General</option>
        		<option value="Work">Work</option>
        		<option value="Personal">Personal</option>
        		<option value="Ideas">Ideas</option>
      		</select>
			<div className='note-footer'>
				{noteText.length > 0 && (
					<small>
						{characterLimit - noteText.length} Remaining
					</small>
				)}			
				<button className='save' onClick={handleSaveClick}>
					Save
				</button>
			</div>
		</div>
	);
};

export default AddNote;