interface HaversineDistance {
  lat1: number;
  lng1: number;
  lat2: number;
  lng2: number;
}

// 하버사인함수: 지구를 완벽한 원형으로 가정하여 두 지점 간의 거리를 계산
export const calculateHaversineDistance = ({lat1, lng1, lat2, lng2}: HaversineDistance) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance * 1000;
};