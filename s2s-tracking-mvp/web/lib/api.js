
// API utility functions for frontend integration
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchAffiliates() {
	const res = await fetch(`${BASE_URL}/affiliates`);
	if (!res.ok) throw new Error('Failed to fetch affiliates');
	return res.json();
}

export async function fetchAffiliateSummary(id) {
	const res = await fetch(`${BASE_URL}/affiliates/${id}/summary`);
	if (!res.ok) throw new Error('Failed to fetch summary');
	return res.json();
}

export async function fetchAffiliateClicks(id, limit = 10, offset = 0) {
	const res = await fetch(`${BASE_URL}/affiliates/${id}/clicks?limit=${limit}&offset=${offset}`);
	if (!res.ok) throw new Error('Failed to fetch clicks');
	return res.json();
}

export async function fetchAffiliateConversions(id, limit = 10, offset = 0) {
	const res = await fetch(`${BASE_URL}/affiliates/${id}/conversions?limit=${limit}&offset=${offset}`);
	if (!res.ok) throw new Error('Failed to fetch conversions');
	return res.json();
}
