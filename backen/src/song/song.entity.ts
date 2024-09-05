// src/songs/song.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  artist: string;

  @Column({ type: 'varchar', length: 255 })
  album: string;

  @Column({ type: 'varchar', length: 255 })
  duration: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagePath: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  audioPath: string;

  constructor() {
    this.id = 0;  // Initialize id
    this.title = '';  // Initialize title
    this.artist = '';  // Initialize artist
    this.album = '';  // Initialize album
    this.duration = '';  // Initialize duration
    this.imagePath = '';  // Initialize imagePath
    this.audioPath = '';  // Initialize audioPath
  }
}
