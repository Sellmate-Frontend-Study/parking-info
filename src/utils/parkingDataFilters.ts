import { ParkingInfo } from '@/types/parking';
import { calculateHaversineDistance } from './calculateHaversineDistance';

export const filterValidParkingData = (allParkingData: ParkingInfo[]) => {
  return allParkingData.filter(
    (row: ParkingInfo) => parseFloat(row.LAT) !== 0 || parseFloat(row.LOT) !== 0
  );
};

export const filterNearByCenter = (
  validParkingData: ParkingInfo[],
  centerLat: number,
  centerLng: number,
  radius: number
): ParkingInfo[] => {
  return validParkingData.filter((parkingData: ParkingInfo) => {
    const distance = calculateHaversineDistance({
      lat1: centerLat,
      lng1: centerLng,
      lat2: parseFloat(parkingData.LAT),
      lng2: parseFloat(parkingData.LOT)
    });
    return distance <= radius;
  });
}; 