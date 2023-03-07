import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getItem } from 'services/backend';
import { RootState } from './store';

export interface ExampleState {
	items: string[];
}

const initialState: ExampleState = {
	items: [],
};

export interface ActionFetchItem {
	id: string;
}

export const fetchItem = createAsyncThunk(
	'example/fetchItem',
	async(action: ActionFetchItem, thunkApi) => {
		thunkApi.dispatch(exampleSlice.actions._fetchItem(action));
		return await getItem(action.id);
	}
);

const exampleSlice = createSlice({
	name: 'example',
	initialState,
	reducers: {
		_fetchItem: (state, action) => {
			// Do something with state
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchItem.pending, (state, action) => {
			// Do something
		});
		builder.addCase(fetchItem.rejected, (state, action) => {
			// Do something
		});
		builder.addCase(fetchItem.fulfilled, (state, action) => {
			state.items.push(action.payload.data);
		});
	},
});
export const exampleState = exampleSlice.getInitialState();

export const getItems = (state: RootState) => {
	return state.example.items;
	// this can be called with const items = useAppSelector(getItems);
	// the data can also be obtained with const items = useAppSelector((state) => state.example.items);
};

export default exampleSlice.reducer;