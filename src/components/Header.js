import React from 'react';

const Header = ({ handleToggleDarkMode, exportNotes, importNotes }) => {
  return (
    <header className='header'>
      <h1>Notes App</h1>
      <div className="header-buttons">
        <button onClick={exportNotes} className='export-button'>
          Export Notes
        </button>
        <input
          type="file"
          id="import-input"
          style={{ display: 'none' }}
          onChange={importNotes}
        />
        <label htmlFor="import-input" className='import-button'>
          Import Notes
        </label>
        <button
          onClick={() => handleToggleDarkMode((prevMode) => !prevMode)}
          className='toggle-mode'
        >
          Toggle Dark Mode
        </button>
      </div>
    </header>
  );
};

export default Header;