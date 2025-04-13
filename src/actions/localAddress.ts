'use server';

import { LocalAddress, LocalAddressResponse } from '@/types/localAddress';

export const getLocalAddress = async (address: string): Promise<LocalAddress[]> => {
	const apiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
	const apiUrl = process.env.NEXT_PUBLIC_KAKAO_LOCAL_API_URL;

	const response = await fetch(`${apiUrl}?query=${address}`, {
		headers: {
			Authorization: `KakaoAK ${apiKey}`,
		},
	});
	const json: LocalAddressResponse = await response.json();

	return json.documents;
};
