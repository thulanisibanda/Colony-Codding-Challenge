// Define the state type

import { Actions } from "../types/index";
export interface RootState {
  transactions: any[];
  sendingError: string
}

// Initial state
const initialState: RootState = {
  transactions: [],
  sendingError: ''
};

const reducer = (state = initialState, action: any): RootState => {
  switch (action.type) {
    // Action to handle sending error
    case Actions.SetSendingError:
      return {...state, sendingError: action.payload};
    default:
      return state;
  }
};

export default reducer;
