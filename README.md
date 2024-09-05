# Full-Stack Music Management Application

This project is a full-stack application for managing music. It includes a backend built with NestJS and a frontend built with React, Redux Toolkit, and Redux-Saga. The backend handles CRUD operations for songs and file uploads, while the frontend provides a user interface for interacting with the API.

## Project Overview

- **Frontend**: React application with Redux Toolkit and Redux-Saga for state management. It allows users to view, create, update, and delete songs.
- **Backend**: NestJS application for managing songs and handling file uploads. It supports CRUD operations and serves song data.

## Figma Design

- **Design File**: [Music Management UI Design](https://www.figma.com/design/CiqNy4dU8T15C2KDDYeLuD/Untitled?node-id=16-2&node-type=FRAME&t=quI7iVeETyJ0C3Qe-0)

- ##youtube Demo:https://youtu.be/HGt09y2FUX0?si=RbeSzyIjbseiFzah 
## Installation

### Backend

1. **Clone the repository**

    ```bash
    git clone github.com/nesuh/AddisInternshipSongManagerWebProject
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory and set the following environment variables:

    ```env
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USER=yourusername
    DATABASE_PASSWORD=yourpassword
    DATABASE_NAME=song_management
    ```

4. **Run the application**

    ```bash
    npm run start
    ```

### Frontend

1. **Clone the repository**

    ```bash
    git clone github.com/nesuh/AddisInternshipSongManagerWebProject
    cd music-frontend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory and set the following environment variables:

    ```env
    REACT_APP_API_URL=http://localhost:3000
    ```

4. **Run the application**

    ```bash
    npm start
    ```

## API Endpoints

### Songs

- **Get All Songs**

    ```http
    GET /songs
    ```

    **Response:**

    ```json
    [
      {
        "id": 1,
        "title": "Song Title",
        "album": "Album Name",
        "artist": "Artist Name",
        "duration": "3:45",
        "imagePath": "/uploads/images/imagefile.jpg",
        "audioPath": "/uploads/music/audiofile.mp3"
      }
    ]
    ```

- **Get Song by ID**

    ```http
    GET /songs/:id
    ```

    **Response:**

    ```json
    {
      "id": 1,
      "title": "Song Title",
      "album": "Album Name",
      "artist": "Artist Name",
      "duration": "3:45",
      "imagePath": "/uploads/images/imagefile.jpg",
      "audioPath": "/uploads/music/audiofile.mp3"
    }
    ```

- **Create a New Song**

    ```http
    POST /songs/upload
    ```

    **Request Body:**

    ```json
    {
      "title": "Song Title",
      "album": "Album Name",
      "artist": "Artist Name",
      "duration": "3:45"
    }
    ```

    **Request Files:**

    - `imageFile` (image file for the song)
    - `audioFile` (audio file for the song)

    **Response:**

    ```json
    {
      "id": 1,
      "title": "Song Title",
      "album": "Album Name",
      "artist": "Artist Name",
      "duration": "3:45",
      "imagePath": "/uploads/images/imagefile.jpg",
      "audioPath": "/uploads/music/audiofile.mp3"
    }
    ```

- **Update a Song**

    ```http
    PUT /songs/:id
    ```

    **Request Body:**

    ```json
    {
      "title": "Updated Song Title",
      "album": "Updated Album Name",
      "artist": "Updated Artist Name",
      "duration": "4:00"
    }
    ```

    **Request Files:**

    - `imageFile` (optional)
    - `audioFile` (optional)

    **Response:**

    ```json
    {
      "id": 1,
      "title": "Updated Song Title",
      "album": "Updated Album Name",
      "artist": "Updated Artist Name",
      "duration": "4:00",
      "imagePath": "/uploads/images/updatedimagefile.jpg",
      "audioPath": "/uploads/music/updatedaudiofile.mp3"
    }
    ```

- **Delete a Song**

    ```http
    DELETE /songs/:id
    ```

    **Response:**

    ```json
    {
      "message": "Song deleted successfully"
    }
    ```

## Frontend Design

The frontend design is based on the following Figma designs:

- **Main Page**: [Figma Design - Main Page]([https://www.figma.com/file/yourfilelink](https://www.figma.com/design/CiqNy4dU8T15C2KDDYeLuD/Untitled?node-id=16-2&node-type=FRAME&t=quI7iVeETyJ0C3Qe-0)) 


These designs illustrate the layout and visual aspects of the application, including the UI elements, color scheme, typography, and overall user experience.

## Project Structure

### Backend

- `src/songs/` - Contains the song-related modules, services, and controllers.
- `src/song.entity.ts` - Defines the Song entity.
- `src/createSongs.dto.ts` - DTOs for creating and updating songs.
- `src/song.service.ts` - Service handling song operations.
- `src/song.controller.ts` - Controller handling HTTP requests related to songs.

### Frontend

- `src/components/` - React components for song management (e.g., SongList, SongForm).
- `src/redux/` - Redux slices and sagas for state management.
- `src/pages/` - React pages for displaying and managing songs.

## Contributing

Feel free to open issues or submit pull requests. Please ensure your code adheres to the project's coding standards and passes all tests.



## Contact

For any questions or issues, please contact [antenhesilesi@gmail.com).
