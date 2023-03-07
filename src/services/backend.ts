import axios, { type AxiosResponse } from 'axios';

export async function getItem(id: string): Promise<AxiosResponse> {
	return axios.get(id);
}