import { MarkerType } from "@/types/marker";

export const getTrafficState = (available: number, total: number): MarkerType => {
	if (total === 1) return 'normal';
	const ratio = available / total;
	if (available >= total) return 'jammed';
	if (ratio > 0.7) return 'congested';
	if (ratio > 0) return 'smooth';
	return 'normal';
};