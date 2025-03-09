'use client'

import KakaoMap from "@/_component/KakaoMap";
import { api } from "@/api/hooks";
import { xmlToJson } from "@/utils/xmlToJson";
import { useEffect } from "react";

export default function Home() {

  const fetchApi=async ()=>{
    const res = await (await api.get('http://openapi.seoul.go.kr:8088/48616d4372626c7537326d5579724a/xml/GetParkInfo/1/5/')).text()
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(res, "application/xml");
    let jsonResult = xmlToJson(xmlDoc.documentElement);
    console.log(jsonResult);
  }

  useEffect(()=>{
    fetchApi()
  },[])
  return (
    <KakaoMap/>
  );
}
