import { Address } from '../Address';
import { Transaction } from '../Transaction';
import { Wallet } from '../Wallet';

export const MockWallet: Wallet = {
  label: 'Main Wallet',
  primaryAddress: 0,
  addresses: [
    {
      publicKey: '00001',
      label: 'Primary Address',
      balance: 100
    },
    {
      publicKey: '00002',
      label: 'Storage',
      balance: 50
    }
  ],
  transactions: [
    {
      fromPublicKey: 'xxxx1',
      toPublicKey: '00001',
      txid: 'x00001',
      timestamp: Number(`${new Date().getTime()}`),
      amount: 100,
      label: 'sample'
    }
  ]
};
