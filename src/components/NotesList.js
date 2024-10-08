import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({
	notes,
	handleAddNote,
	handleDeleteNote,
	handleEditNote,
	handleToggleFavorite,
}) => {
	return (
		<div className='notes-list'>
			{notes.map((note) => (
				<Note
					key={note.id}
					id={note.id}
					title={note.title}
					text={note.text}
					date={note.date}
					favorite={note.favorite}
					handleDeleteNote={handleDeleteNote}
					handleEditNote={handleEditNote}
					handleToggleFavorite={handleToggleFavorite}
				/>
			))}
			<AddNote handleAddNote={handleAddNote} />
		</div>
	);
};

export default NotesList;