

export async function getNextItem(num: number): Promise<number> {
	await new Promise( resolve => setTimeout(resolve, 1000) );
	return num + 1;
}