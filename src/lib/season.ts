import { seasons, type Season } from '#lib/content/site.ts';

const key = (month: number, day: number) => month * 100 + day;

/** The seasonal campaign whose window contains `date`, if any. Windows may wrap past New Year. */
export function activeSeason(date = new Date()): Season | undefined {
	const today = key(date.getMonth() + 1, date.getDate());
	return seasons.find(({ from, to }) => {
		const start = key(...from);
		const end = key(...to);
		return start <= end ? today >= start && today <= end : today >= start || today <= end;
	});
}
