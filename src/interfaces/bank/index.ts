import { AccountInterface } from 'interfaces/account';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BankInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  accounts?: number;
  users?: number;
  account?: AccountInterface[];
  user?: UserInterface;
  _count?: {
    account?: number;
  };
}

export interface BankGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
