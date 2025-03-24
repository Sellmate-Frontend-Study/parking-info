import ky from 'ky';

export const apiClient = ky.create({
  prefixUrl: `http://openapi.seoul.go.kr:8088/${process.env.NEXT_PUBLIC_SEOUl_API_KEY}/json/GetParkInfo`,
});