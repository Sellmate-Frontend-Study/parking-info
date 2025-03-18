'use server';

import { calculateHaversineDistance } from '../utils/calculateHaversineDistance';

const PAGE_SIZE = 1000;

export const getParkingInfo = async (centerLat: number, centerLng: number, radius: number) => {
  try {
    const countRes = await fetch(
      `http://openapi.seoul.go.kr:8088/${process.env.NEXT_PUBLIC_SEOUl_API_KEY}/json/GetParkInfo/1/1`,
    );
    const countData = await countRes.json();
    const totalCount = countData.GetParkInfo.list_total_count;
    
    let allParkingData: any[] = [];
    let start = 1;
    const promises = [];

    while (start <= totalCount) {
      const end = Math.min(start + PAGE_SIZE - 1, totalCount); 
      const promise = fetch(
        `http://openapi.seoul.go.kr:8088/${process.env.NEXT_PUBLIC_SEOUl_API_KEY}/json/GetParkInfo/${start}/${end}`,
      ).then(response => response.json());
      
      promises.push(promise);
      start += PAGE_SIZE;
    }
    
    const result = await Promise.all(promises);
    for (const parkingData of result) {
      allParkingData.push(...parkingData.GetParkInfo.row);
    }

    const validParkingData = allParkingData.filter(
      (row: any) => parseFloat(row.LAT) !== 0 || parseFloat(row.LOT) !== 0
    );
    
    const parkingDataNearByCenter = validParkingData.filter((parkingData: any) => {
      const distance = calculateHaversineDistance({
        lat1: centerLat, 
        lng1: centerLng, 
        lat2: parseFloat(parkingData.LAT), 
        lng2: parseFloat(parkingData.LOT)
      });
      return distance <= radius;
    });
    //TODO: 중복 되는 데이터가 있는 거 같은데 이게 다른건가?
    
    return parkingDataNearByCenter;
  } catch (error) {
    console.error('getParkingInfo error', error);
    return [];
  }
}