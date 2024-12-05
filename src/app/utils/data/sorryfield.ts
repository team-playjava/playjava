export const fetchChart = async (id: string, mode: string) => {
	const response = await fetch(`http://localhost:3000/api/proxy/sorryfield/chart/${id}/${mode}`, {
		cache: 'no-store',
	});
	return response.json();
};

export const fetchAllChart = async () => {
	const response = await fetch(`http://localhost:3000/api/proxy/sorryfield/chart/all`, {
		cache: 'no-store',
	});
	return response.json();
};

export const fetchSong = async (id: number) => {
	const response = await fetch(`http://localhost:3000/api/proxy/sorryfield/song/${id}`, {
		cache: 'no-store',
	});
	return response.json();
};