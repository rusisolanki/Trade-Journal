import { createSlice, configureStore } from "@reduxjs/toolkit";

const journalInitialState = {
  journal: [],
};

const tradesInitialState = {
  trade: [],
};

const exitTradeState = {
  exitTrade: [],
};

const symbolInitialState = {
  symbol: [],
};
const fundsInitialState = {
  fund: [],
};
const adjustmentsInitialState = {
  adjustment: [],
};

const modalInitialState = {
  showModal: false,
};

const idState = {
  journalID: null,
  tradeID: null
}

const tradeSlice = createSlice({
  name: "trade",
  initialState: tradesInitialState,
  reducers: {
    change(state, action) {
      state.trade = action.payload;
    },
  },
});

const exitTradeSlice = createSlice({
  name: "exitTrade",
  initialState: exitTradeState,
  reducers: {
    change(state, action) {
      state.exitTrade = action.payload;
    },
  },
});

const symbolSlice = createSlice({
  name: "symbol",
  initialState: symbolInitialState,
  reducers: {
    change(state, action) {
      state.symbol = action.payload;
    },
  },
});

const journalSlice = createSlice({
  name: "journal",
  initialState: journalInitialState,
  reducers: {
    change(state, action) {
      state.journal = action.payload;
    },
  },
});

const fundSlice = createSlice({
  name: "funds",
  initialState: fundsInitialState,
  reducers: {
    change(state, action) {
      state.fund = action.payload;
    },
  },

});

const adjustmentSlice = createSlice({
  name: "adjustments",
  initialState: adjustmentsInitialState,
  reducers: {
    change(state, action) {
      state.adjustment = action.payload;
    },
  },
});

const modalSlice = createSlice({
  name: "modal",
  initialState: modalInitialState,
  reducers: {
    change(state, action) {
      state.showModal = action.payload
    },
  },
});

const idSlice = createSlice({
  name: "journal-id",
  initialState: idState,
  reducers: {
    changeJournal(state, action) {
      state.journalID = action.payload
    },
    changeTrade(state, action){
      state.tradeID = action.payload
    }
  },
});

export const tradeActions = tradeSlice.actions;
export const exitTradeActions = exitTradeSlice.actions;
export const symbolActions = symbolSlice.actions;
export const journalActions = journalSlice.actions;
export const modalActions = modalSlice.actions;
export const fundActions = fundSlice.actions;
export const adjustmentActions = adjustmentSlice.actions;
export const idActions = idSlice.actions;

const store = configureStore({
  reducer: {
    tradeReducer: tradeSlice.reducer,
    exitTradeReducer: exitTradeSlice.reducer,
    symbolReducer: symbolSlice.reducer,
    journalReducer: journalSlice.reducer,
    modalReducer: modalSlice.reducer,
    fundReducer: fundSlice.reducer,
    adjustmentReducer: adjustmentSlice.reducer,
    idReducer: idSlice.reducer,
  },
});

export default store;
