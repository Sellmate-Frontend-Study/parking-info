export interface KakaoSearchResult {
	meta: {
		total_count: number;
		pageable_count: number;
		is_end: boolean;
	};
	documents: KakaoSearchDocument[];
}

export interface KakaoSearchDocument {
	x: string;
	y: string;
	[key: string]: string;
}
