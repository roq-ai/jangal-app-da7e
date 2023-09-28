import { AccountInterface } from 'interfaces/account';
import { GetQueryInterface } from 'interfaces';

export interface TransactionHistoryInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  sender_account_number?: string;
  reciever_account_number?: string;
  transaction_amount: number;
  transaction_status: string;

  account_transaction_history_sender_account_numberToaccount?: AccountInterface;
  account_transaction_history_reciever_account_numberToaccount?: AccountInterface;
  _count?: {};
}

export interface TransactionHistoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  sender_account_number?: string;
  reciever_account_number?: string;
  transaction_status?: string;
}
