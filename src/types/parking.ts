export interface ParkingResponse {
  GetParkInfo: {
    list_total_count: number;
    row: ParkingInfo[];
  }
}

export interface ParkingInfo {
  LAT: string;
  LOT: string;
  [key: string]: any;
} 