import express from 'express';
import cors from 'cors'; 
import { bookRouter } from './routes/BookRoutes';
import { borrowingRouter } from './routes/BorrowingRoutes';
import { copyOfBookRouter } from './routes/CopyOfBookRoutes';
import { publisherRouter } from './routes/PublisherRoutes';
import { readerRouter } from './routes/ReaderRoutes';
import { AppDataSource } from '../dbConfig';
import router from './routes/RouteConst';

const app = express();

const main = async () => {
  try {
    AppDataSource.initialize()

    console.log('Connected to Postgres');

    app.use(cors());
    app.use(express.json());

    app.use('/', router);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    throw new Error('Unable to connect to db');
  }
};

main();