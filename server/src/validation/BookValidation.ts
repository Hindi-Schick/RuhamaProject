import * as yup from 'yup';

export const bookSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  publisher_id: yup.number().required(),
  published_date: yup.date(),
  price: yup.number().required(),
});

export default bookSchema;
