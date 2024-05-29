import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";



//les interfaces si il y en a
interface CounteurState {
    value: number;
    loading: boolean;
}

//initial state: obligatoir
const initialState: CounteurState = {
    value: 0,
    loading: false,
}

// Thunks
export const incrementAsync = createAsyncThunk(
    //name
    "increment/incrementAsync",
    //action
    async (amount: number) => {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
        return amount
    }
)



//le slice
const counterSlice = createSlice({
    //le nom du slice
    name: "counter",
    //le state
    initialState,
    //les redux
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    },

    //les autres redux
    extraReducers: (builder) => {
        builder
        //incrematation
            .addCase(incrementAsync.pending, (state) => {
                state.loading = true;
                console.log('loading ....', state.loading);
            })
            .addCase(incrementAsync.fulfilled, (state, { payload }: PayloadAction<number>) => {
                state.loading = false;
                state.value += payload;
                console.log('loading ....', state.loading);
            })
            
        //incrematation
    },
});



export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer;