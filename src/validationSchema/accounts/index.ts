import * as yup from 'yup';

export const accountValidationSchema = yup.object().shape({
  account_number: yup.string().nullable(),
  account_balance: yup.number().required(),
  account_type: yup.string().nullable(),
  bank_name: yup.string().nullable(),
  roq_user_id: yup.string().nullable(),
});
