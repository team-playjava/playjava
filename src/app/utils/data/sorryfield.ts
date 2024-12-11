export const fetchChart = async (id: string, mode: string) => {
	const response = await fetch(`http://localhost:3000/api/chart/${id}/${mode}`, {
		cache: 'no-store',
	});
	return response.json();
};

export const fetchAllChart = async () => {
	const response = await fetch(`http://localhost:3000/api/chart/all`, {
		cache: 'no-store',
	});
	return response.json();
};

export const fetchChartRaw = async (id: string, mode: string) => {
	const response = await fetch(`http://localhost:3000/api/chart/${id}/${mode}/raw`, {
		cache: 'no-store',
	});
	return response.text();
};

export const fetchSong = async (id: number) => {
	const response = await fetch(`http://localhost:3000/api/proxy/sorryfield/song/${id}`, {
		cache: 'no-store',
	});
	return response.json();
};

export const searchChart = async (search: string) => {
	if (search === '') {
		return [];
	}
	const response = await fetch(`http://localhost:3000/api/chart/search/${search}`, {
		cache: 'no-store',
	});
	return response.json();
};