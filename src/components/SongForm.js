/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addSong, updateSong, fetchSongs } from '../slices/songSlice';

const formStyle = css`
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
  max-width: 600px;
  margin: 20px auto;
`;

const inputStyle = css`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const buttonStyle = css`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4E0467;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;



const SongForm = ({ songToEdit, onClose }) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    title: '',
    album: '',
    artist: '',
    duration: '',
    imageFile: null,
    audioFile: null,
    imagePath: '',
    audioPath: ''
  });

  useEffect(() => {
    if (songToEdit) {
      setFormState({
        title: songToEdit.title || '',
        album: songToEdit.album || '',
        artist: songToEdit.artist || '',
        duration: songToEdit.duration || '',
        imagePath: songToEdit.imagePath || '',
        audioPath: songToEdit.audioPath || ''
      });
    }
  }, [songToEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile' || name === 'audioFile') {
      setFormState((prev) => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', formState.title);
    formData.append('album', formState.album);
    formData.append('artist', formState.artist);
    formData.append('duration', formState.duration);
    if (formState.imageFile) {
      formData.append('imageFile', formState.imageFile);
    }
    if (formState.audioFile) {
      formData.append('audioFile', formState.audioFile);
    }
    
    try {
      if (songToEdit && songToEdit.id) {
        // Update existing song
        await dispatch(updateSong({ id: songToEdit.id, formData }));
        
      } else {
        // Add a new song
        await dispatch(addSong(formData));
      }

      // Fetch the updated song list
      dispatch(fetchSongs());
      // Close the form
      onClose();
    } catch (error) {
      console.error("Error during song submission:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <h2>{songToEdit && songToEdit.id ? 'Edit Song' : 'Add Song'}</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        css={inputStyle}
        value={formState.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="album"
        placeholder="Album"
        css={inputStyle}
        value={formState.album}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="artist"
        placeholder="Artist"
        css={inputStyle}
        value={formState.artist}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="duration"
        placeholder="Duration"
        css={inputStyle}
        value={formState.duration}
        onChange={handleChange}
        required
      />
      <div>
        <label>Current Image: {formState.imagePath || 'None'}</label>
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          css={inputStyle}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Current Audio: {formState.audioPath || 'None'}</label>
        <input
          type="file"
          name="audioFile"
          accept="audio/*"
          css={inputStyle}
          onChange={handleChange}
        />
      </div>
      <button type="submit" css={buttonStyle}>
        {songToEdit && songToEdit.id ? 'Update Song' : 'Add Song'}
      </button>
    </form>
  );
};

export default SongForm;
