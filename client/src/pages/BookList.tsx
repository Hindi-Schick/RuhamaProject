import { Button, Grid, Pagination, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBooks } from "../api/book.api";
import BookCard from "../components/BookCard";
import { Book } from "../utils/types";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    const fetchedBooks = await fetchBooks();
    setBooks(fetchedBooks);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredBooks = books.filter(book =>
    (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
    !book.deleted_at
  );

  return (
    <>
      <Typography variant="h4">Book List</Typography>
      <TextField
        label="Search Book"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Grid container spacing={2}>
        {filteredBooks.slice(startIndex, endIndex).map((book) => (
          <Grid key={book.book_id} item xs={12} sm={6} md={4}>
            <BookCard
              book={book}
              fetchData={fetchData}
            />
          </Grid>
        ))}
      </Grid>
      {filteredBooks.length > itemsPerPage && (
        <Stack spacing={2} sx={{ marginTop: '16px' }}>
          <Pagination count={Math.ceil(filteredBooks.length / itemsPerPage)} page={page} onChange={handleChange} />
        </Stack>
      )}
      <Button
        component={Link}
        to="/addBook"
        variant="contained"
        color="primary"
        style={{ margin: '16px' }}
      >
        Add New Book
      </Button>
    </>
  );
};

export default BookList;