import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counteur/counterSlice';



const store = configureStore({
    reducer: {
        counter: counterReducer,
    }
});

export default store;

export type RootSatate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;