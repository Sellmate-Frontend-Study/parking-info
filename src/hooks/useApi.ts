import { useEffect, useState } from 'react';

const useAPI = <T>(url: string, config?: RequestInit) => {
 const [data, setData] = useState<T | null>(null)
 const [error, setError] = useState<Error | null>(null)

 const getData = async () => {
  try {
   const res = await fetch(url, config);
   const json: T = await res.json();
   setData(() => json);
   return data;
  } catch (error) {
   if (error instanceof Error) setError(error)
  }
 }

 useEffect(() => {
  getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [url])

 return {
  data,
  error,
 } as { data: T }
};

export default useAPI