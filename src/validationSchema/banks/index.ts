import * as yup from 'yup';

export const bankValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  name: yup.string().required(),
  accounts: yup.number().integer().nullable(),
  users: yup.number().integer().nullable(),
  user_id: yup.string().nullable().required(),
});
