export default class Utilities {
    static waitTime = (time: number = 100) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    };
    static daysInMonth = (month: number, year: number): number => {
        return new Date(year, month, 0).getDate();
    };
}
