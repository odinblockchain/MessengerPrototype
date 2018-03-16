import { Address } from './Address';
import { Transaction } from './Transaction';

export class Wallet {
  label: string;
  primaryAddress: number;
  addresses: Array<Address>;
  transactions: Transaction[];
}
