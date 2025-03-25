export const getCurrentLocation = (): Promise<GeolocationPosition> =>
	new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
