import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as serveStatic from 'serve-static';
import { join } from 'path';
import * as cors from 'cors';
// import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: 'http://localhost:3001', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    
  }));  // Enable CORS
  // Serve static files
  app.use('/uploads', serveStatic(join(__dirname, '../../uploads')));

    // // Set body parser limits
    // app.use(bodyParser.json({ limit: '50mb' }));
    // app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(3000);
}
bootstrap();
