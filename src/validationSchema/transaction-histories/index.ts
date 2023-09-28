import * as yup from 'yup';

export const transactionHistoryValidationSchema = yup.object().shape({
  transaction_amount: yup.number().required(),
  transaction_status: yup.string().required(),
  sender_account_number: yup.string().nullable(),
  reciever_account_number: yup.string().nullable(),
});
