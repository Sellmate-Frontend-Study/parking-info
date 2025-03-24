'use server';

export const getParkInfo = async (): Promise<any[]> => {
	const pageSize = 1000;
	const apiKey = process.env.NEXT_PUBLIC_OPEN_API_KEY;

	const firstResponse = await fetch(
		`http://openapi.seoul.go.kr:8088/${apiKey}/json/GetParkInfo/1/${pageSize}`
	);
	const firstJson = await firstResponse.json();

	const totalCount = firstJson.GetParkInfo.list_total_count;
	let parkInfos = [...firstJson.GetParkInfo.row];

	let currentIndex = pageSize + 1;

	while (currentIndex <= totalCount) {
		const endIndex = Math.min(currentIndex + pageSize - 1, totalCount);
		const response = await fetch(
			`http://openapi.seoul.go.kr:8088/${apiKey}/json/GetParkInfo/${currentIndex}/${endIndex}`
		);
		const json = await response.json();

		parkInfos = parkInfos.concat(json.GetParkInfo.row);
		currentIndex += pageSize;
	}

	return parkInfos;
};
