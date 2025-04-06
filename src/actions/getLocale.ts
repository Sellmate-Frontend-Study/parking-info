export const getLocale = async (query: string): Promise<{ lat: number; lng: number } | null> => {
	const apiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
	const apiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${query}`;

	const response = await fetch(`${apiUrl}`, {
		headers: { Authorization: `KakaoAK ${apiKey}` },
	});
	const json: { documents: { x: number; y: number }[] } = await response.json();

	const latLng =
		json.documents[0]?.x && json.documents[0]?.y
			? { lat: json.documents[0].y, lng: json.documents[0].x }
			: null;

	return latLng;
};
