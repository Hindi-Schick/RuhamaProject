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

const VISIBLE_FIELDS = ['borrowing_id', 'copy_book_id', 'reader_id', 'book_id', 'borrow_date', 'return_date'];

export default function BorrowingTable() {
    const { data: borrowingsData } = useQuery('borrowings', async () => {
        const response = await axios.get('http://localhost:8080/api/borrowings');
        return response.data;
    });

    const rows = borrowingsData || []; // Set rows to an empty array if borrowingsData is undefined

    const columns = React.useMemo(
        () =>
            VISIBLE_FIELDS.map((field) => ({
                field,
                headerName: field.replace(/_/g, ' ').toUpperCase(), // Convert snake_case to Camel Case for header
                flex: 1,
            })),
        [],
    );

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
                    getRowId={(row) => row.borrowing_id} // Use the actual unique identifier property
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
       </div>
    );
};