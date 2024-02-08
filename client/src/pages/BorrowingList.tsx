import * as React from 'react';
import { Portal } from '@mui/base/Portal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGrid, GridToolbarQuickFilter, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

function BorrowingList(props: any) {
    return (
        <React.Fragment>
            <Portal container={() => document.getElementById('filter-panel')!}>
                <GridToolbarQuickFilter />
            </Portal>
            <GridToolbar {...props} />
        </React.Fragment>
    );
}

const VISIBLE_FIELDS = ['borrowing_id', 'copy_book_id', 'book_title', 'reader_name', 'borrow_date', 'return_date'];

export default function BorrowingTable() {
    const { data: borrowingsData } = useQuery('borrowings', async () => {
        const response = await axios.get('http://localhost:8080/api/borrowings');
        return response.data;
    });

    const rows = borrowingsData || [];

    const columns = React.useMemo(
        () =>
            VISIBLE_FIELDS.map((field) => ({
                field,
                headerName: field.replace(/_/g, ' ').toUpperCase(),
                flex: 1,
            })),
        [],
    );

    const handleReturnBook = async (borrow_id: any) => {
        try {
            await axios.post('http://localhost:8080/api/returnBook', { borrow_id });
            // Refresh the borrowings data after returning the book
            // This will re-fetch the borrowings list to reflect the updated data
            // Assuming you're using react-query, you can invalidate the query here
        } catch (error) {
            console.error(error);
            // Handle error if needed
        }
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item>
                    <Box id="filter-panel" />
                </Grid>
                <Grid item style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowId={(row) => row.borrowing_id}
                        slots={{
                            toolbar: BorrowingList,
                        }}
                        initialState={{
                            filter: {
                                filterModel: {
                                    items: [],
                                    quickFilterExcludeHiddenColumns: true,
                                },
                            },
                        }}
                    />
                </Grid>
            </Grid>
            <Button
                component={Link}
                to="/addBorrowing"
                variant="contained"
                color="primary"
                style={{ margin: '16px' }}
            >
                Borrow a book
            </Button>
            <Button
                variant="contained"
                color="secondary"
                style={{ margin: '16px' }}
                onClick={() => handleReturnBook(rows.borrowing_id)}
            >
                Return Book
            </Button>
        </div>
    );
};
