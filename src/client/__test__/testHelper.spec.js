import { getISODateWithoutTime, addDayDate, calculateNumberOfDaysBetweenTwoDates} from '../js/helper';

describe("Testing helper", () => {
    test("Test getISODateWithoutTime()", () => {
        const d1 = new Date(2018, 11, 24, 10, 33, 30, 0);
        expect(getISODateWithoutTime).toBeDefined();
        expect(getISODateWithoutTime(d1)).toBe('2018-12-24');
    })
    test("Test addDayDate()", () => {
        expect(addDayDate).toBeDefined();

        const d1 = new Date(2018, 11, 24, 10, 33, 30, 0);
        const newDate = addDayDate(d1, 3);
        expect(getISODateWithoutTime(newDate)).toBe('2018-12-27');
    })
    test("Test calculateNumberOfDaysBetweenTwoDates()", () => {
        expect(calculateNumberOfDaysBetweenTwoDates).toBeDefined();

        const d1 = new Date(2018, 11, 24);
        const d2 = new Date(2018, 11, 27);
        const daysBetween = calculateNumberOfDaysBetweenTwoDates(d1, d2);
        expect(daysBetween).toBe(3);
    })
})