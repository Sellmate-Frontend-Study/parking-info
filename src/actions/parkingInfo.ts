'use server';

import { ParkingInfo, ParkingInfoResponse } from '@/types/parkingInfo';

export const getParkingInfo = async (): Promise<ParkingInfo[]> => {
 const pageSize = 1000;
 const apiKey = process.env.NEXT_PUBLIC_OPEN_API_KEY;
 const apiUrl = `${process.env.BASE_URL}/${apiKey}/json/GetParkingInfo`;

 const response = await fetch(`${apiUrl}/1/${pageSize}`);
 const json: ParkingInfoResponse = await response.json();

 const totalCount = json.GetParkingInfo.list_total_count;
 let parkingInfos = [...json.GetParkingInfo.row];

 let currentIndex = pageSize + 1;

 while (currentIndex <= totalCount) {
  const endIndex = Math.min(currentIndex + pageSize - 1, totalCount);
  const response = await fetch(`${apiUrl}/${currentIndex}/${endIndex}`);
  const json: ParkingInfoResponse = await response.json();

  parkingInfos = parkingInfos.concat(json.GetParkingInfo.row);
  currentIndex += pageSize;
 }

 return parkingInfos;
};
