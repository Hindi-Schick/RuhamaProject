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
    publisher_id: number;
    published_date: Date;
    price: number;
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
    book_id: number;
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
  
  
  
  
  
  

