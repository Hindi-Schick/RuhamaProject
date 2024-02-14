import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import BookForm from "../components/BookForm"
import BorrowingForm from "../components/BorrowingForm"
import PublisherForm from "../components/PublisherForm"
import ReaderForm from "../components/ReaderForm"
import BookList from "../pages/BookList"
import ReaderList from "../pages/ReaderList"
import BorrowedBooks from "../components/BorrowedBooks"
import BorrowingTable from "../pages/BorrowingList"
import TopTen from "../pages/TopTen"
import OverdueReaderList from "../pages/OverdueReaderList"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/addBook" element={<BookForm />} />
      <Route path="/addBorrowing" element={<BorrowingForm />} />
      <Route path="/borrowing" element={<BorrowingTable />} /> 
      <Route path="/publisher" element={<PublisherForm />} />
      <Route path="/reader" element={<ReaderForm />} />
      <Route path="/bookList" element={<BookList />} />
      <Route path="/readerList" element={<ReaderList />} />
      <Route path="/reader/:readerId/borrowed-books" element={<BorrowedBooks />} />
      <Route path="/topTen" element={<TopTen />} />
      <Route path="/overdueReaders" element={<OverdueReaderList />} />
    </Routes>
  )
}

export default AppRoutes