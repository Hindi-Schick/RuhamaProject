import { Box, Button, Modal, Typography } from '@mui/material';
import axios from 'axios';
import { BookAddingProps } from '../utils/types';


const BookAdding: React.FC<BookAddingProps> = ({ open, onClose, selectedBook }) => {

    const handleSave = async () => {
        try {
            await axios.post(`http://localhost:8080/api/copyOfBook`, {
                is_borrowed: false,
                book_id: selectedBook?.book_id
            });
        } catch (error) {
            console.error(error);
        } finally {
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                <Typography variant="h6">Add Copies</Typography>
                <Typography variant="body1">Are you sure you want to add a copy of {selectedBook?.title}?</Typography>
                <Button variant="contained" onClick={handleSave} color="primary" style={{ marginRight: '8px' }}>
                    Save
                </Button>
                <Button variant="contained" onClick={onClose} color="secondary">
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
};

export default BookAdding;
