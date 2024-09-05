/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SongForm from './SongForm';
import { fetchSongs, deleteSong,updateSong } from '../slices/songSlice';
import { showDeleteToast, showErrorToast } from '../pages/toast';
import delete_icon from '../Assets/delete_icon.png';
import update from '../Assets/update.png';
import play from '../Assets/play.png';
import pause from '../Assets/pause.png';
import add from '../Assets/add.png';
import next from '../Assets/next.png';
import prev from '../Assets/prev.png';
import music from '../Assets/music.png'

// Emotion styles
const containerStyle = css`
  margin: 0 auto;
  max-width: 1400px;

  h1 {
    text-align: center;
    color: #4E0467;
    font-family: 'Poppins', sans-serif;
  }

  @media (max-width: 1200px) {
    max-width: 1000px;
  }

  @media (max-width: 992px) {
    max-width: 750px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 10px;
  }
`;

const listStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
  list-style: none;
`;

const listItemStyle = css`
  flex: 0 0 48%;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #4E0467;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex: 0 0 100%;
    margin-bottom: 15px;
  }
`;

const imgStyle = css`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-right: 10px;
`;


const songDescriptionStyle = css`
  border: 1px solid #ddd;
  padding: 10px;
  width: 60%;
  background-color: #f9f9f9;
  border-radius: 5px;
  text-align: center;
  color:#4E0467;
     font-family: 'Poppins', sans-serif;
  
`;

const actionButtonsStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const UDbtn=css`
margin-right:35px;
padding:20px;
 &:hover {
    background-color: #0056b3;
  }

`
const ImageSong=css`
margin-left:-13rem;
margin-top:10rem;

img{
width:300%;
border-radius:100rem;
}
`
const buttonStyle = css`
  margin: 5px;
   padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #4E0467;
  color: white;
  cursor: pointer;
  border:1px solid
  &:hover {
    background-color: #0056b3;
  }
  img {
    width: 20px;
    height: 20px;
  }
`;

const AddButtonStyle = css`
  position: fixed; /* Changed from 'absolute' to 'fixed' */
  right: 20px;
  top: 10px;
  border-radius: 30px;
  background-color: #4E0467;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  z-index: 1000; /* Added z-index to ensure it's on top of other elements */
  padding:3px 6px;
    &:hover {
    background-color:#0056b3;
  }

  font-family: 'Poppins', sans-serif;
  img {
    width: 40px;
    height: 40px;
    margin-left:10px;
  }
`;

const PPICON=css`
border:1px solid #4E0100;
`
const SongList = () => {
  const dispatch = useDispatch();
  const {songs, loading, error } = useSelector((state) => state.songs);
  const [editingSong, setEditingSong] = useState(null);
  const [playingSong, setPlayingSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleSongEnd = () => {
      setPlayingSong(null);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleSongEnd);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleSongEnd);
    };
  }, []);

  const handlePlayPause = (song, index) => {
    const audio = audioRef.current;

    if (playingSong && playingSong.id === song.id) {
      audio.pause();
      setPlayingSong(null);
      setCurrentSongIndex(null);
    } else {
      if (playingSong) {
        audio.pause();
      }
      setPlayingSong(song);
      setCurrentSongIndex(index);
      audio.src = `http://localhost:3000${song.audioPath}`;
      audio.play().catch((err) => {
        console.error('Error playing audio:', err);
      });
    }
  };

  const handleEdit = (id,song) => {
    dispatch(updateSong(id));
    setEditingSong(id,song);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteSong(id));
      showDeleteToast('Song deleted successfully!');
      dispatch(fetchSongs()); // Refresh the song list
    } catch (error) {
      console.error('Error during song deletion:', error);
      showErrorToast('An error occurred while deleting the song. Please try again.');
    }
  };
  

  const handleCloseForm = () => {
    setEditingSong(null);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = e.target.value;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleNext = () => {
    if (songs.length > 0 && currentSongIndex !== null) {
      const nextIndex = (currentSongIndex + 1) % songs.length;
      handlePlayPause(songs[nextIndex], nextIndex);
    }
  };

  const handlePrevious = () => {
    if (songs.length > 0 && currentSongIndex !== null) {
      const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      handlePlayPause(songs[prevIndex], prevIndex);
    }
  };

  if (loading) return <p>Loading songs...</p>;
  if (error) return <p>Error fetching songs: {error}</p>;

  return (
    <div css={containerStyle}>
      <h1>LISTEN NESUH MUSIC</h1>
      <button css={AddButtonStyle} onClick={() => setEditingSong({})}>
        <p>Add</p> <img src={add} alt="Add Song" />
      </button>

      {editingSong && (
        <SongForm songToEdit={editingSong} onClose={handleCloseForm} />
      )}

      <ul css={listStyle}>
        {songs.map((song, index) => (
          <li key={song.id} css={listItemStyle}>
            <div css={songDescriptionStyle}>
              <img
                src={`http://localhost:3000${song.imagePath}`}
                alt={song.title}
                css={imgStyle}
                onError={(e) => (e.target.style.display = 'none')}
              />
              <h4>{song.title}</h4>
              <p>Artist: {song.artist}</p>
              <p>Album: {song.album}</p>
              <p>Duration: {song.duration || 'N/A'}</p>
    <div css={PPICON}>
<button css={buttonStyle} onClick={handlePrevious}>
                <img src={prev} alt="Previous" />
              </button>
              <button css={buttonStyle} onClick={() => handlePlayPause(song, index)}>
                <img
                  src={playingSong && playingSong.id === song.id ? pause : play}
                  alt={
                    playingSong && playingSong.id === song.id ? 'Pause' : 'Play'
                  }
                />
              </button>
              <button css={buttonStyle} onClick={handleNext}>
                <img src={next} alt="Next" />
              </button>
   
   </div>
              
            </div>

            <div css={actionButtonsStyle}>
             
              {playingSong && playingSong.id === song.id && (
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  step="0.1"
                  css={buttonStyle}
                  onChange={handleSeek}
                />
              )}
          <div css={UDbtn}>
          <button css={buttonStyle} onClick={() => handleEdit(song)}>
                <img src={update} alt="Edit" /> <p>Edit</p>
              </button>
              <button css={buttonStyle} onClick={() => handleDelete(song.id)}>
               
                <img src={delete_icon} alt="Delete" /> <p>Delete</p>
              </button>
              </div>
              <div css={ImageSong}>
              <img src={music} alt="Music Icon" />
              </div>
             
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
