import axios, { type AxiosResponse } from 'axios';

export async function getFoodById(): Promise<AxiosResponse> {
	return axios.get('tmp');
}