import { useState } from 'react';
import { MdDeleteForever, MdEdit, MdSave, MdStar, MdStarBorder } from 'react-icons/md';

const Note = ({ id, title, text, date, favorite, category, handleDeleteNote, handleEditNote, handleToggleFavorite }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(title);
	const [editedText, setEditedText] = useState(text);
	const [editedCategory, setEditedCategory] = useState(category);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		handleEditNote(id, editedTitle, editedText, editedCategory);
		setIsEditing(false);
	};

	return (
		<div className='note'>
			{isEditing ? (
				<>
					<input
						type="text"
						value={editedTitle}
						onChange={(e) => setEditedTitle(e.target.value)}
					/>
					<textarea
						rows="8"
						cols="10"
						value={editedText}
						onChange={(e) => setEditedText(e.target.value)}
					></textarea>
					<select
            			value={editedCategory}
						onChange={(e) => setEditedCategory(e.target.value)}
					>
						<option value="General">General</option>
						<option value="Work">Work</option>
						<option value="Personal">Personal</option>
						<option value="Ideas">Ideas</option>
					</select>
				</>
			) : (
				<>
					<h3>{title}</h3>
					<span>{text}</span>
					<small>Category: {category}</small>
				</>
			)}
			<div className='note-footer'>
				<small>{date}</small>
				<div>
					{favorite ? (
						<MdStar
							onClick={() => handleToggleFavorite(id)}
							className='favorite-icon'
							size='1.3em'
						/>
					) : (
						<MdStarBorder
							onClick={() => handleToggleFavorite(id)}
							className='favorite-icon'
							size='1.3em'
						/>
					)}
					{isEditing ? (
						<MdSave onClick={handleSave} className='edit-icon' size='1.3em' />
					) : (
						<MdEdit onClick={handleEdit} className='edit-icon' size='1.3em' />
					)}
					<MdDeleteForever
						onClick={() => handleDeleteNote(id)}
						className='delete-icon'
						size='1.3em'
					/>
				</div>
			</div>
		</div>
	);
};

export default Note;