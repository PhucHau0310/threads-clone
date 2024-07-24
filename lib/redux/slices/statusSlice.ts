import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Status {
    status: number | null;
    message: string | null;
}
const initialState: Status = {
    status: null,
    message: null,
};

const statusSlice = createSlice({
    name: 'status',
    initialState: initialState,
    reducers: {
        resStatus: (state, action: PayloadAction<Status>) => {
            state.status = action.payload.status;
            state.message = action.payload.message;
        },
    },
});

export const { resStatus } = statusSlice.actions;
export default statusSlice.reducer;
