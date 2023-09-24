import { takeEvery, put } from 'redux-saga/effects';
import { JsonRpcProvider, Transaction, TransactionResponse, TransactionReceipt, BrowserProvider, Signer } from 'ethers';

import apolloClient from '../apollo/client';
import { Actions } from '../types';
import { SaveTransaction } from '../queries';
import { navigate } from '../components/NaiveRouter';

// passing data from form
function* sendTransaction(data: any) {
  const provider = new JsonRpcProvider('http://localhost:8545');
  // this could have been passed along in a more elegant fashion,
  // but for the purpouses of this scenario it's good enough
  // @ts-ignore
  const walletProvider = new BrowserProvider(window.web3.currentProvider);
  const signer: Signer = yield walletProvider.getSigner();
  const accounts: Array<{ address: string }> = yield provider.listAccounts();
// Task 3: using to and value from form
  const transaction = {
    to: data.payload.to,
    value: data.payload.value,
  };

  try {
    const txResponse: TransactionResponse = yield signer.sendTransaction(transaction);
    const response: TransactionReceipt = yield txResponse.wait();

    const receipt: Transaction = yield response.getTransaction();

    const variables = {
      transaction: {
        gasLimit: (receipt.gasLimit && receipt.gasLimit.toString()) || '0',
        gasPrice: (receipt.gasPrice && receipt.gasPrice.toString())|| '0',
        to: receipt.to,
        from: receipt.from,
        value: (receipt.value && receipt.value.toString()) || '',
        data: receipt.data || null,
        chainId: (receipt.chainId && receipt.chainId.toString()) || '123456',
        hash: receipt.hash,
      }
    };

    yield apolloClient.mutate({
      mutation: SaveTransaction,
      variables,
    });
    // setting error text to success for form closing logic
    yield put({ type: 'SET_SENDING_ERROR', payload: 'success' })
    // Task 4: navigating to transaction after success
    navigate(`/transaction/${receipt.hash}`)
  } catch (error: any) {
    console.log(error)
    yield put({ type: 'SET_SENDING_ERROR', payload: 'Something went wrong' })
  }

}

export function* rootSaga() {
  yield takeEvery(Actions.SendTransaction, sendTransaction);
}
