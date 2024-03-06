import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Publisher } from '../utils/types';
import Card from '../components/Card';
import { GridDeleteIcon } from '@mui/x-data-grid';

const PublisherList: React.FC = () => {
    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [publisherIdToDelete, setPublisherIdToDelete] = useState<number | null>(null);
    const [deleteError, setDeleteError] = useState(false);

    const fetchPublishers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/publishers');
            const filteredPublishers = response.data.filter((publisher: Publisher) => !publisher.deleted_at);
            const publishersWithPayment = await Promise.all(filteredPublishers.map(async (publisher: Publisher) => {
                const paymentResponse = await axios.get(`http://localhost:8080/api/publisher/payment-report/${publisher.publisher_id}`);
                return { ...publisher, totalPayment: paymentResponse.data.totalPayment };
            }));
            setPublishers(publishersWithPayment);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPublishers();
    }, []);

    const handleDeleteDialogOpen = (bookId: number) => {
        setPublisherIdToDelete(bookId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setPublisherIdToDelete(null);
    };

    const handleDelete = async (publisherId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/publisher/${publisherId}`);
            fetchPublishers();
            handleDeleteDialogClose();
            setDeleteError(false);
        } catch (error) {
            console.error(error);
            setDeleteError(true);
            handleDeleteDialogClose();
        } finally {
            setTimeout(() => setDeleteError(false), 3000);
        }
    };
    return (
        <>
            <Typography variant="h4">Publisher List</Typography>
            <Grid container spacing={2}>
                {publishers.map((publisher) => (
                    <Grid key={publisher.publisher_id} item xs={12} sm={6} md={4}>
                        <Card
                            title={publisher.name}
                            details={[
                                publisher.location,
                                'Total Payment: ' + publisher.totalPayment + '₪',
                            ]}
                            actions={<IconButton aria-label="delete" onClick={() => handleDeleteDialogOpen(publisher.publisher_id)} >
                                <GridDeleteIcon />
                            </IconButton>
                            }
                        />
                    </Grid>
                ))}
            </Grid>
            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogTitle>Delete Publisher</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this publisher?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleDelete(publisherIdToDelete!)} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            {deleteError && (
                <Alert variant="outlined" severity="error">
                    Cannot delete publishers with books
                </Alert>
            )}
            <Button
                component={Link}
                to="/publisher"
                variant="contained"
                color="primary"
                style={{ margin: '16px' }}
            >
                Add Publisher
            </Button>
        </>
    )
}

export default PublisherList