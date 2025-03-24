'use server';

import { parkingService } from '@/services/parkingService';
import { filterValidParkingData, filterNearByCenter } from '@/utils/parkingDataFilters';

export const getParkingInfo = async (centerLat: number, centerLng: number, radius: number) => {
  try {
    const allParkingData = await parkingService.getAllParkingData();
    const validParkingData = filterValidParkingData(allParkingData);
    const parkingDataNearByCenter = filterNearByCenter(validParkingData, centerLat, centerLng, radius);
    
    return parkingDataNearByCenter;
  } catch (error) {
    console.error('getParkingInfo error', error);
    return [];
  }
}