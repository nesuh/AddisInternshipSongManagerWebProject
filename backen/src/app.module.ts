import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SongModule } from './song/song.modue';
import { Song } from './song/song.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost', // Provide default value if undefined
      port: parseInt(process.env.DATABASE_PORT || '5432', 10), // Provide default value if undefined
      username: process.env.DATABASE_USERNAME || 'user', // Provide default value if undefined
      password: process.env.DATABASE_PASSWORD || '', // Ensure it is an empty string if no password
      database: process.env.DATABASE_NAME || 'database', // Provide default value if undefined
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Song]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../uploads'),
      serveRoot: '/uploads', 
      // Serve the uploads directory
    }),
    SongModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
