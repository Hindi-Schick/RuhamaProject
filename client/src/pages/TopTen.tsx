import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';

interface Book {
  id: number;
  // numSales: number;
  title: string;
}

export default function TopTenPieChart() {
  const [topBooks, setTopBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await axios.get<Book[]>('http://localhost:8080/api/top10');
        setTopBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopBooks();
  }, []);

  return (
    <PieChart
      series={[
        {
          data: topBooks.map((book, index) => ({
            id: index,
            value: index/index,
            label: book.title,
          })),
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      width={1000} 
      height={400}
    />
  );
}
