export const insertColon = (time: string): string => {
	if (!time || time.length !== 4) return time;
	return `${time.slice(0, 2)}:${time.slice(2)}`;
};
