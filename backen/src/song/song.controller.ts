import { Controller, Get, Post, Body, Param, Delete, Put, UploadedFiles, UseInterceptors, Res, BadRequestException } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SongsService } from './song.service';
import { Song } from './song.entity';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { CreateSongDto, UpdateSongDto } from './createSongs.dto';
import { v4 as uuidv4 } from 'uuid';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {
    const imagePath = join(__dirname, '../../uploads/images');
    const musicPath = join(__dirname, '../../uploads/music');

    // Ensure directories exist
    if (!existsSync(imagePath)) {
      mkdirSync(imagePath, { recursive: true });
    }

    if (!existsSync(musicPath)) {
      mkdirSync(musicPath, { recursive: true });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Song | null> {
    return this.songsService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imageFile', maxCount: 1 },
      { name: 'audioFile', maxCount: 1 },
    ], {
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (file.fieldname === 'imageFile') {
            cb(null, join(__dirname, '../../uploads/images'));
          } else if (file.fieldname === 'audioFile') {
            cb(null, join(__dirname, '../../uploads/music'));
          }
        },
        filename: (req, file, cb) => {
          const filename = uuidv4() + extname(file.originalname);
          cb(null, filename);
        },
      }),
    }),
  )
  async addSong(
    @Body() songData: CreateSongDto,
    @UploadedFiles() files: { imageFile?: Express.Multer.File[], audioFile?: Express.Multer.File[] },
  ) {
    if (!files || !files.imageFile || !files.audioFile) {
      throw new BadRequestException('Image and audio files are required');
    }

    const imageFile = files.imageFile[0];
    const audioFile = files.audioFile[0];

    const imagePath = `/uploads/images/${imageFile.filename}`;
    const audioPath = `/uploads/music/${audioFile.filename}`;

    const newSong = {
      title: songData.title,
      album: songData.album,
      artist: songData.artist,
      duration: songData.duration,
      imagePath,
      audioPath,
    };

    return this.songsService.create(newSong);
  }

  @Post()
  create(@Body() song: CreateSongDto): Promise<Song> {
    return this.songsService.create(song);
  }
  @Put(':id')
@UseInterceptors(
  FileFieldsInterceptor([
    { name: 'imageFile', maxCount: 1 },
    { name: 'audioFile', maxCount: 1 },
  ], {
    storage: diskStorage({
      destination: (req, file, cb) => {
        if (file.fieldname === 'imageFile') {
          cb(null, join(__dirname, '../../uploads/images'));
        } else if (file.fieldname === 'audioFile') {
          cb(null, join(__dirname, '../../uploads/music'));
        }
      },
      filename: (req, file, cb) => {
        const filename = uuidv4() + extname(file.originalname);
        cb(null, filename);
      },
    }),
  }),
)
async update(
  @Param('id') id: number,
  @Body() song: UpdateSongDto,
  @UploadedFiles() files: { imageFile?: Express.Multer.File[], audioFile?: Express.Multer.File[] } = {},
  @Res() res: Response
): Promise<Song> {
  const existingSong = await this.songsService.findOne(id);
  if (!existingSong) {
    throw new BadRequestException('Song not found');
  }

  let updatedImagePath = existingSong.imagePath;
  let updatedAudioPath = existingSong.audioPath;
  let oldImagePath = '';
  let oldAudioPath = '';

  // Handle image file update
  if (files.imageFile && files.imageFile.length > 0) {
    oldImagePath = join(__dirname, '../../uploads/images', existingSong.imagePath.split('/').pop() || '');
    updatedImagePath = `/uploads/images/${files.imageFile[0].filename}`;
  }

  // Handle audio file update
  if (files.audioFile && files.audioFile.length > 0) {
    oldAudioPath = join(__dirname, '../../uploads/music', existingSong.audioPath.split('/').pop() || '');
    updatedAudioPath = `/uploads/music/${files.audioFile[0].filename}`;
  }

  // Update song object with new data
  const updatedSong = {
    ...existingSong,
    ...song,
    imagePath: updatedImagePath,
    audioPath: updatedAudioPath,
  };

  try {
    // Update song in the database
    const savedSong = await this.songsService.update(id, updatedSong);

    // Delete old image file if new one is uploaded and update succeeded
    if (oldImagePath && existsSync(oldImagePath)) {
      unlinkSync(oldImagePath);
    }

    // Delete old audio file if new one is uploaded and update succeeded
    if (oldAudioPath && existsSync(oldAudioPath)) {
      unlinkSync(oldAudioPath);
    }

    res.status(200).json({ message: 'Song updated successfully', song: savedSong });
    return savedSong;
  } catch (err) {
    const errorMessage = (err as Error).message;

    // Rollback by deleting new image and audio files if they exist
    if (files.imageFile && existsSync(join(__dirname, '../../uploads/images', files.imageFile[0].filename))) {
      unlinkSync(join(__dirname, '../../uploads/images', files.imageFile[0].filename));
    }

    if (files.audioFile && existsSync(join(__dirname, '../../uploads/music', files.audioFile[0].filename))) {
      unlinkSync(join(__dirname, '../../uploads/music', files.audioFile[0].filename));
    }

    res.status(500).json({ message: 'Error updating song', error: errorMessage });
    throw new BadRequestException(errorMessage);
  }
}

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.songsService.remove(id);
  }
}
