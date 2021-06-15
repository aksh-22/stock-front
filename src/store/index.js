import { configureStore, createSlice } from '@reduxjs/toolkit';



const initialState = { apiData: [], nodeData: [] };
// const a = async () => {
//   const res = await fetch('http://127.0.0.1:3000/api/v1/stocks/getstocks')
//   const fetcheddata = await res.json()
//   return fetcheddata
// }

const dataSlice = createSlice({
  name: 'serviceState',
  initialState,
  reducers: {
    setApiData(state, action) {
      state.apiData = action.payload;
    },
    setNodeData(state, action) {
      state.nodeData = action.payload;
    },
    deleteNodeData(state, action) {
      state.nodeData = action.payload;
    }
  },
});

export const dataActions = dataSlice.actions;

export const store = configureStore({
  reducer: dataSlice.reducer,
});
