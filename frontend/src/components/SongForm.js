/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addSong, updateSong, fetchSongs } from '../slices/songSlice';
import { showSuccessToast, showErrorToast } from '../pages/toast';
const modalBackdropStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /*nesuh@:- Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /*nesuh@:- used to Ensures the modal is on top */
`;

const modalContentStyle = css`
  background-color: #f2f2f2;
  padding: 20px; /* Reduced padding */
  border-radius: 5px;
  max-width: 600px;
  width: 100%; /* Responsive */
  overflow-y: auto; /* Add scroll if content overflows */

  h2{
  color:#4E0467;
  }
`;

const inputStyle = css`
  display: block;
  width: 100%;
  padding: 8px; 
  margin-bottom: 8px; 
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const buttonStyle = css`
  padding: 8px 16px; /* Reduced padding */
  border: none;
  border-radius: 5px;
  background-color: #4E0467;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const errorStyle = css`
  color: red;
  font-size: 0.8em; /*nesuh@:- Reduced font size */
  margin:0;
`;

const storeButton = css`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    
    button {
      margin-top: 5px;
    }
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

  const [errors, setErrors] = useState({});

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
    if (files) {
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

  const validate = () => {
    const newErrors = {};
    if (!formState.title) newErrors.title = 'Title is required';
    if (!formState.album) newErrors.album = 'Album is required';
    if (!formState.artist) newErrors.artist = 'Artist is required';
    if (!formState.duration) newErrors.duration = 'Duration is required';
    if (!formState.imageFile && !formState.imagePath) newErrors.imageFile = 'Image file is required';
    if (!formState.audioFile && !formState.audioPath) newErrors.audioFile = 'Audio file is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
        await dispatch(updateSong({ id: songToEdit.id, formData }));
        showSuccessToast('Song updated successfully!');
      } else {
        await dispatch(addSong(formData));
        showSuccessToast('Song added successfully!');
      }

      dispatch(fetchSongs());
      onClose();
    } catch (error) {
      console.error('Error during song submission:', error);
      showErrorToast('An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <div css={modalBackdropStyle}>
      <div css={modalContentStyle}>
        <form onSubmit={handleSubmit}>
          <h2>{songToEdit && songToEdit.id ? 'Edit Song' : 'Add Song'}</h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            css={inputStyle}
            value={formState.title}
            onChange={handleChange}
          />
          {errors.title && <p css={errorStyle}>{errors.title}</p>}

          <input
            type="text"
            name="album"
            placeholder="Album"
            css={inputStyle}
            value={formState.album}
            onChange={handleChange}
          />
          {errors.album && <p css={errorStyle}>{errors.album}</p>}

          <input
            type="text"
            name="artist"
            placeholder="Artist"
            css={inputStyle}
            value={formState.artist}
            onChange={handleChange}
          />
          {errors.artist && <p css={errorStyle}>{errors.artist}</p>}

          <input
            type="text"
            name="duration"
            placeholder="Duration"
            css={inputStyle}
            value={formState.duration}
            onChange={handleChange}
          />
          {errors.duration && <p css={errorStyle}>{errors.duration}</p>}

          <div>
            <label>Current Image: {formState.imagePath || 'None'}</label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              css={inputStyle}
              onChange={handleChange}
            />
            {errors.imageFile && <p css={errorStyle}>{errors.imageFile}</p>}
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
            {errors.audioFile && <p css={errorStyle}>{errors.audioFile}</p>}
          </div>
          
          <div css={storeButton}>
            <button type="submit" css={buttonStyle}>
              {songToEdit && songToEdit.id ? 'Update Song' : 'Add Song'}
            </button>
            <button type="button" css={buttonStyle} onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SongForm;
