/**
* 전체 데이터를 가져오는 함수
*/
const getAllData = async <T>(fetchPageData: (page: number) => Promise<{
 total: number;
 data: T[];
}>, perPage = 1000) => {
 // 첫 번째 페이지 요청하여 데이터와 전체 개수 가져오기
 const firstPageData = await fetchPageData(1);
 const total = firstPageData.total;
 const totalPages = Math.ceil(total / perPage);

 // 나머지 페이지 데이터 요청 (첫 번째 페이지 제외)
 const requests = Array.from({ length: totalPages - 1 }, (_, index) =>
  fetchPageData(index + 2) // 2페이지부터 요청
 );

 const results = await Promise.all(requests);

 return [firstPageData.data, ...results.flatMap((res) => res.data)].flat();
}

export default getAllData