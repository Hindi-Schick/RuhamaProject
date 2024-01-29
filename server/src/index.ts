import express from 'express';
import { createConnection } from 'typeorm';
import { bookRouter } from './routes/BookRoutes';
import { borrowingRouter } from './routes/BorrowingRoutes';
import { copyOfBookRouter } from './routes/CopyOfBookRoutes';
import { publisherRouter } from './routes/PublisherRoutes';
import { readerRouter } from './routes/ReaderRoutes';


const app = express();

const main = async () => {
	try {
		await createConnection({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'postgres',
			database: 'library_db',
			"entities": [
                "src/entities/*.ts"
            ],
			synchronize: true,
		});
		console.log('Connected to Postgres');

        app.use(express.json());
		app.use(bookRouter);
		app.use(borrowingRouter);
		app.use(copyOfBookRouter);
		app.use(publisherRouter);
		app.use(readerRouter);

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