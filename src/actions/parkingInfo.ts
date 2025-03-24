'use server';

export const getParkingInfo = async (): Promise<any[]> => {
	const pageSize = 1000;
	const apiKey = process.env.NEXT_PUBLIC_OPEN_API_KEY;

	const firstResponse = await fetch(
		`http://openapi.seoul.go.kr:8088/${apiKey}/json/GetParkingInfo/1/${pageSize}`
	);
	const firstJson = await firstResponse.json();

	const totalCount = firstJson.GetParkingInfo.list_total_count;
	let parkInfos = [...firstJson.GetParkingInfo.row];

	let currentIndex = pageSize + 1;

	while (currentIndex <= totalCount) {
		const endIndex = Math.min(currentIndex + pageSize - 1, totalCount);
		const response = await fetch(
			`http://openapi.seoul.go.kr:8088/${apiKey}/json/GetParkingInfo/${currentIndex}/${endIndex}`
		);
		const json = await response.json();

		parkInfos = parkInfos.concat(json.GetParkingInfo.row);
		currentIndex += pageSize;
	}

	return parkInfos;
};
