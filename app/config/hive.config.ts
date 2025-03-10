import { Client } from '@hiveio/dhive';

export const HIVE_NODES = [
  'https://api.hive.blog',
  'https://api.hivekings.com',
  'https://anyx.io',
  'https://api.openhive.network'
];

export const client = new Client(HIVE_NODES);

// App Constants from environment
export const APP_NAME = process.env.APP_NAME;
export const APP_TAG = process.env.APP_TAG;
export const CONTRACT_ACCOUNT: string = process.env.NEXT_CONTRACT_ACCOUNT || ''; 
export const CONTRACT_MEMO_PREFIX = 'bounty-';

// Transaction Configuration
export const TRANSACTION_RETRY_ATTEMPTS = 3;
export const TRANSACTION_EXPIRY = 60000; // 60 seconds