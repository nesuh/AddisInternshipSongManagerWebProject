import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDto, UpdateSongDto } from './createSongs.dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}

   // Fetch a single song by ID
findOne(id: number): Promise<Song | null> {
  return this.songsRepository.findOne({
    where: { id: id },
  });
}

  // Fetch all songs
  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }



  // Create a new song
  async create(createSongDto: CreateSongDto): Promise<Song> {
    try {
      const newSong = this.songsRepository.create(createSongDto);
      console.log('Creating song:', createSongDto);

      return await this.songsRepository.save(newSong);
    } catch (error) {
      console.error('Error in SongsService.create:', error);
      throw error;
    }
  }

  // Update an existing song
  async update(id: number, updatedSong: Partial<Song>): Promise<Song> {
    const song = await this.songsRepository.findOne({where: {id:id}});
    if (!song) {
      throw new Error('Song not found');
    }
    Object.assign(song, updatedSong);
    return this.songsRepository.save(song);
  }
  

  // Remove a song by ID
  async remove(id: number): Promise<void> {
    await this.songsRepository.delete(id);
  }
}
