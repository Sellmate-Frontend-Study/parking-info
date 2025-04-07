'use server';

import { KakaoSearchResult } from '@/types/kakaoSearch';

export const searchKeyword = async (keyword: string) => {
	try {
		const apiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
		const res = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}`, {
			headers: {
				Authorization: `KakaoAK ${apiKey}`,
			},
		});

		const data: KakaoSearchResult = await res.json();
		if (data.documents && data.documents.length > 0) {
			const { x, y } = data.documents[0];
			return {
				lat: parseFloat(y),
				lng: parseFloat(x),
			};
		}
		return 'no';
	} catch (error) {
		console.error('searchKeyword error', error);
		return null;
	}
};
