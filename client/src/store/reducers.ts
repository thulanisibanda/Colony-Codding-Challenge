// Define the state type

import { Actions } from "../types/index";
export interface RootState {
  transactions: any[];
  sendingError: string;
  currentWallet: string;
}

// Initial state
const initialState: RootState = {
  transactions: [],
  sendingError: '',
  currentWallet:''
};

const reducer = (state = initialState, action: any): RootState => {
  switch (action.type) {
    // Action to handle sending error
    case Actions.SetSendingError:
      return {...state, sendingError: action.payload};
    case Actions.setCurrentWallet:
      return {...state, currentWallet: action.payload};

    default:
      return state;
  }
};

export default reducer;
