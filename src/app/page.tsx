"use client"

import { useEffect } from 'react';
import KakaoMap from '@/components/KakaoMap';
import type { ParkingInfo } from './api/parking-info/route';

export default function Home() {
 const getParkingInfo = async () => {
  try {
   const res = await fetch('api/parking-info')
   const json: { data: ParkingInfo[] } = await res.json();
   console.log(json)
  } catch (error) {
   console.error(error)
  }
 }

 useEffect(() => {
  getParkingInfo()
 }, [])

 return (
  <KakaoMap />
 )
}
