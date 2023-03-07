import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './exampleSlice';

export const appStore = configureStore({
	reducer: {
		example: exampleReducer,
	}
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;