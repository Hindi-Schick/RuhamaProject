import * as React from 'react';
import { Portal } from '@mui/base/Portal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGrid, GridToolbarQuickFilter, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { useGridApiRef } from '@mui/x-data-grid';
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

const VISIBLE_FIELDS = ['borrowing_id', 'book_title', 'reader_name', 'borrow_date', 'return_date'];

export default function BorrowingTable() {
    const { data: borrowingsData } = useQuery('borrowings', async () => {
        const response = await axios.get('http://localhost:8080/api/borrowings');
        return response.data;
    });

    const rows = borrowingsData || [];
    const queryClient = useQueryClient();
    const apiRef = useGridApiRef();

    const columns = React.useMemo(
        () =>
            VISIBLE_FIELDS.map((field) => ({
                field,
                headerName: field.replace(/_/g, ' ').toUpperCase(),
                flex: 1,
                ...(field === 'borrow_date' || field === 'return_date' ? {
                    type: 'date',
                    valueFormatter: (params: any) => params.value ? new Date(params.value).toLocaleDateString() : null,
                } : {}),
            })),
        [],
    );

    const handleReturnBook = async (borrow_id: number) => {
        console.log(borrow_id);

        try {
            await axios.patch('http://localhost:8080/api/returnBook', { borrow_id });
            await queryClient.refetchQueries('borrowings');

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
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
                        apiRef={apiRef}
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
                onClick={() => {
                    const selectedRows = apiRef.current?.getSelectedRows(); 
                    if (selectedRows && selectedRows.size > 0) {
                        const firstSelectedRow = selectedRows.values().next().value; 
                        if (firstSelectedRow) {
                            handleReturnBook(firstSelectedRow.borrowing_id); 
                        }
                    } else {
                        console.warn('No row selected'); 
                    }
                }}
            >
                Return Book
            </Button>

        </>
    );
};
