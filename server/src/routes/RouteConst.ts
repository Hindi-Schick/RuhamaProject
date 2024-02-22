import express from "express";
import { bookRouter } from "./BookRoutes";
import { borrowingRouter } from "./BorrowingRoutes";
import { copyOfBookRouter } from "./CopyOfBookRoutes";
import { publisherRouter } from "./PublisherRoutes";
import { readerRouter } from "./ReaderRoutes";

const router = express.Router()

router.use(bookRouter);
router.use(borrowingRouter);
router.use(copyOfBookRouter);
router.use(publisherRouter);
router.use(readerRouter);

export default router