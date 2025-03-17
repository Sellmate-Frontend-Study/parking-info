'use client';

import { useEffect, useState } from 'react';
import { getParkingInfo } from '../actions/getParkingInfo';

const useParkingInfo = ({centerPosition, radius}: {centerPosition: {lat: number, lng: number}, radius: number}) => {
  const [parkingInfo, setParkingInfo] = useState<any[]>([]);

  const fetchParkingInfo = async () => {
    try {
      const res = await getParkingInfo(
        centerPosition.lat,
        centerPosition.lng,
        radius
      );
      setParkingInfo(res);
    } catch (error) {
      console.error('fetchParkingInfo Error', error);
    }
  };

  useEffect(() => {
    fetchParkingInfo();
  }, [centerPosition, radius]);

  return { parkingInfo, setParkingInfo, fetchParkingInfo };
};

export default useParkingInfo;