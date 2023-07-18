import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNextItem } from 'services/backend';
import { RootState } from './store';

export interface ExampleState {
	value: number;
}

const initialState: ExampleState = {
	value: 0,
};

export interface ActionFetchNextItem {
	current: number;
}

export const incrementValue = createAsyncThunk(
	'example/incrementValue',
	async(action: ActionFetchNextItem, thunkApi) => {
		thunkApi.dispatch(exampleSlice.actions._incrementValue(action));
		return await getNextItem(action.current);
	}
);

const exampleSlice = createSlice({
	name: 'example',
	initialState,
	reducers: {
		_incrementValue: (state, action) => {
			console.log('hit _incrementValue');
			// Do something with state
		}
	},
	extraReducers: (builder) => {
		builder.addCase(incrementValue.pending, (state, action) => {
			console.log('pending');
			// Do something
		});
		builder.addCase(incrementValue.rejected, (state, action) => {
			// Do something
		});
		builder.addCase(incrementValue.fulfilled, (state, action) => {
			console.log('fulfilled');
			state.value = action.payload;
		});
	},
});
export const exampleState = exampleSlice.getInitialState();

export const getValue = (state: RootState) => {
	return state.example.value;
	// this can be called with const items = useAppSelector(getValue);
	// the data can also be obtained with const items = useAppSelector((state) => state.example.value);
};

export default exampleSlice.reducer;