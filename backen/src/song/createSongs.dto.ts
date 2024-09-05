// src/songs/dto/create-song.dto.ts
export class CreateSongDto {
  title?: string;
  artist?: string;
  album?: string;
  duration?: string;
  imagePath?: string; 
  audioPath?: string; 
}

export class UpdateSongDto {
  title?: string;
  artist?: string;
  album?: string;
  duration?: string;
  imagePath?: string; 
  audioPath?: string; 
}