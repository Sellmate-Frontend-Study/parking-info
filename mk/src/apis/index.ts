import ky from "ky";

const api = ky.create({
 prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_AUTH_KEY}/${process.env.NEXT_PUBLIC_API_TYPE}`,
});

export const parkApi = api.extend((options) => ({ prefixUrl: `${options.prefixUrl}/GetParkInfo` }));
export const parkingApi = api.extend((options) => ({
 prefixUrl: `${options.prefixUrl}/GetParkingInfo`,
}));
