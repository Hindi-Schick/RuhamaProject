import axios from 'axios';
import { BookFormData, Publisher } from '../utils/types';

export const fetchPublishers = async () => {
  try {
    const response = await axios.get<Publisher[]>(
      'http://localhost:8080/api/publishers'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching publishers:', error);
    throw error;
  }
};

export const addBook = async (bookData: BookFormData) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/book',
      bookData
    );
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const addCopyOfBook = async (copyData: any) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/copyOfBook',
      copyData
    );
    return response.data;
  } catch (error) {
    console.error('Error adding copy of book:', error);
    throw error;
  }
};

export const fetchBooks = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const deleteBook = async (bookId: number) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/book/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
