import { SxProps, Theme } from "@mui/material/styles";

export type Publisher = {
  publisher_id: number;
  name: string;
  location: string;
  deleted_at: Date | null;
  totalPayment?: number;
}

export type BookFormData = {
  title: string;
  author: string;
  publisher_id: number | '';
  published_date: string;
  numCopies: number;
  price: number;
}

export type BorrowedBook = {
  borrowing_id: number;
  copy_book_id: number;
  reader_id: number;
  book_id: number;
  borrow_date: Date;
  return_date: Date | null;
}

export type Reader = {
  reader_id: number;
  name: string;
  email: string;
  phone: number;
  address: string;
  deleted_at: Date | null;
  borrowedBooks: Borrowing[];
}

export type Book = {
  book_id: number;
  title: string;
  author: string;
  publisher: Publisher;
  published_date: Date;
  price: number;
  deleted_at: Date | null;
}

export type BorrowingFormData = {
  copy_book_id: number;
  reader_id: number;
  book_id: number;
  borrow_date: Date;
  return_date: Date;
}

export type CopyOfBook = {
  copy_book_id: number;
  title: string;
  book: Book;
  is_borrowed: boolean;
}

export type PublisherFormData = {
  name: string;
  location: string;
}

export type ReaderFormData = {
  name: string;
  email: string;
  phone: number;
  address: string;
}

export type Borrowing = {
  borrowing_id: number;
  copy_book_id: number;
  reader_id: number;
  book_id: number;
  borrow_date: Date;
  return_date: Date | null;
}

export type GenericCardProps = {
  title: string;
  details: string[];
  actions?: React.ReactNode;
  cardStyle?: SxProps<Theme>;
}

export type BookAddingProps = {
  open: boolean;
  onClose: () => void;
  selectedBook: Book | null;
}

export type BookDeletingProps = {
  open: boolean;
  onClose: () => void;
  bookId: number | null;
  fetchData: () => void;
}








