import KakaoMap from '@/components/KakaoMap';
import getParkingInfo from '@/libs/parkingInfo';
import getParkInfo from '@/libs/parkInfo';

export default async function Home() {
 const [res1, res2] = await Promise.all([
  getParkInfo(),
  getParkingInfo(),
 ]);

 const combinedData = res1.map((item) => {
  const match = res2.find((p) => p.PKLT_CD === item.PKLT_CD);
  return {
   ...item,
   ...match,
  };
 });
 return (
  <KakaoMap />
 )
}
