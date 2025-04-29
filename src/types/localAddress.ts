export interface LocalAddress {
	id: string;
	place_name: string;
	category_name: string;
	category_group_code: string;
	category_group_name: string;
	phone: string;
	address_name: string;
	road_address: string;
	x: string;
	y: string;
	place_url: string;
	distance: string;
}

export interface LocalAddressResponse {
	meta: {
		total_count: number;
		pageable_count: number;
		is_end: boolean;
		same_name: {
			region: string[];
			keyword: string;
			selected_region: string;
		};
	};
	documents: LocalAddress[];
}
