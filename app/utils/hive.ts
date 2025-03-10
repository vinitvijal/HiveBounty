import { KeychainResponse, HiveAccount, TransactionResponse } from '../types/hive.types';
import { APP_NAME, client, CONTRACT_ACCOUNT, PRIVATE_KEY } from '../config/hive.config';
import { getIssueById } from '../actions/github';
import { Asset, PrivateKey } from '@hiveio/dhive';

declare global {
  interface Window {
    hive_keychain: {
      requestSignBuffer: (
        username: string,
        message: string,
        role: string,
        callback: (response: KeychainResponse) => void
      ) => void;
      requestTransfer: (
        from: string,
        to: string,
        amount: string,
        memo: string,
        currency: string,
        callback: (response: KeychainResponse) => void
      ) => void;
    }; // You can define a more specific type if available
  }
}

// Check if Hive Keychain extension is installed
export const isKeychainInstalled = (): boolean => {
  return typeof window !== 'undefined' && 'hive_keychain' in window;
};

// Get Hive Keychain download link
export const getKeychainDownloadLink = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Chrome")) {
    return "https://chrome.google.com/webstore/detail/hive-keychain/jcacnejopjdphbnjgfaaobbfafkihpep";
  } else if (userAgent.includes("Firefox")) {
    return "https://addons.mozilla.org/en-US/firefox/addon/hive-keychain/";
  }
  return "https://hive-keychain.com";
};

// Connect to Hive Keychain
export const connectWithKeychain = async (username: string): Promise<{ success: boolean; message: string; account?: HiveAccount }> => {
  if (!isKeychainInstalled()) {
    return { success: false, message: "Please install Hive Keychain" };
  }

  return new Promise((resolve) => {
    window.hive_keychain.requestSignBuffer(
      username,
      `Login to ${APP_NAME} at ${new Date().toISOString()}`,
      'Posting',
      async (response: KeychainResponse) => {
        if (response.success) {
          try {
            const account = await fetchAccountInfo(username);
            localStorage.setItem('hiveUsername', username);
            resolve({ 
              success: true, 
              message: `Connected as @${username}`,
              account
            });
          } catch {
            resolve({ 
              success: true, 
              message: `Connected as @${username}, but couldn't fetch details.`
            });
          }
        } else {
          resolve({ 
            success: false, 
            message: response.error || "Authentication failed"
          });
        }
      }
    );
  });
};

// Fetch account information
export const fetchAccountInfo = async (username: string): Promise<HiveAccount> => {
  try {
    const accounts = await client.database.getAccounts([username]);
    if (accounts && accounts.length > 0) {
      const account = accounts[0];
      const json_metadata = account.json_metadata ? JSON.parse(account.json_metadata) : {};
      return {
        name: account.name,
        balance: String(account.balance),
        hbd_balance: String(account.hbd_balance),
        vesting_shares: String(account.vesting_shares), 
        reputation: Number(account.reputation),
        profile_image: json_metadata.profile?.profile_image || ''
      };
    }
    throw new Error(`Account @${username} not found`);
  } catch (error) {
    console.error('Error fetching account:', error);
    throw error;
  }
};

// Send HIVE tokens
export const sendHiveTokens = async (
  from: string,
  to: string,
  amount: string,
  memo: string = ''
): Promise<TransactionResponse> => {
  if (!isKeychainInstalled()) {
    return { success: false, message: "Please install Hive Keychain" };
  }

  console.log("Requesting transfer", from, to, amount, memo);
  return new Promise((resolve) => {
    window.hive_keychain.requestTransfer(
      from,
      to,
      amount,
      memo,
      'HIVE',
      (response: KeychainResponse) => {
        console.log("Transfer response", response);
        if (response.success) {
          resolve({ 
            success: true, 
            message: `Sent ${amount} HIVE to @${to}`,
            txId: response.result?.id
          });
        } else {
          resolve({ 
            success: false, 
            message: response.error || "Transfer failed"
          });
        }
      }
    );
  });
};






// Send HIVE tokens
export const claimHiveTokens = async (
  to: string,
  issueId: string,
) => {
  if (!isKeychainInstalled()) {
    return { success: false, message: "Please install Hive Keychain" };
  }

  console.log("Requesting transfer", to, issueId);

  const transf: { from: string; to: string; amount: string | Asset; memo: string } = {
    from: '',
    to: '',
    amount: '',
    memo: ''
  };
    transf.from = CONTRACT_ACCOUNT;
    transf.to = to;

    const issue = await getIssueById(issueId);
    if (!issue) {
      console.error('Issue not found');
      return;
    }
    transf.memo = `bounty-${issue.id}`;
    transf.amount = `${issue.amount} HIVE`;


    console.log(transf)


    const privateKey = PrivateKey.fromString(PRIVATE_KEY);

  client.broadcast.transfer(transf, privateKey).then(
    function(result) {
      console.log(result)
        console.log(
            'included in block: ' + result.block_num,
            'expired: ' + result.expired
        );
        return {
          success: true,
          message: `Sent ${transf.amount} HIVE to @${to}`,
        }
    },
    function(error) {
        console.error(error);
        return {
          success: false,
          message: error.message || "Transfer failed"
        }
    }
);

};