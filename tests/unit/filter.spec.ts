import {
    filterInteger,
    filterBytes,
    filterKiloBytes,
    filterPercent,
    filterSigfig,
    stripBrackets,
    ordinal,
    maxLength,
} from '../../src/filters';

describe('filter test', () => {
    test.each([
        [1000, '1,000'],
        [100, '100'],
        [10000, '10,000'],
    ])('filterInteger(%i)', (input, out) => {
        expect(filterInteger(input as number)).toBe(out);
    });

    test.each([
        [100, '100.0B'],
        [10000, '9.8KB'],
        [1024, '1.0KB'],
        [1024 * 1024, '1.0MB'],
        [1024 * 1024 * 1024, '1.0GB'],
    ])('filterBytes(%i)', (input, out) => {
        expect(filterBytes(input as number)).toBe(out);
    });

    test.each([
        [100, '100.0KB'],
        [10000, '9.8MB'],
        [1024, '1.0MB'],
        [1024 * 1024, '1.0GB'],
        [1024 * 1024 * 1024, '1.0TB'],
    ])('filterKiloBytes(%i)', (input, out) => {
        expect(filterKiloBytes(input as number)).toBe(out);
    });

    test.each([
        [0.01, '1%'],
        [0.10, '10%'],
        [0.25, '25%'],
        [0.50, '50%'],
        [0.504, '50%'],
        [0.506, '51%'],
    ])('filterPercent(%i)', (input, out) => {
        expect(filterPercent(input as number)).toBe(out);
    });

    test.each([
        [0.0000000000000000000025, '0'],
        [10000000.12345, '1.00e+7'],
        [1.1234567, '1.1235'],
        [1.12, '1.1200'],
    ])('filterSigfix(%i)', (input, out) => {
        expect(filterSigfig(input as number)).toBe(out);
    });

    test.each([
        ['[server].[database].[test]', 'server.database.test'],
        ['[.].[test]', '..test'],
        ['[db].[test]', 'db.test'],
        ['[test]', 'test'],
    ])('stripBrackets(%i)', (input, out) => {
        expect(stripBrackets(input as string)).toBe(out);
    });

    test.each([
        [5, '5th'],
        [1, '1st'],
        [11, '11th'],
        [2, '2nd'],
    ])('ordinal(%i)', (input, out) => {
        expect(ordinal(input as number)).toBe(out);
    });

    test.each([
        ['this is a short sentence', 'this is a short sentence'],
        ['this is a really long sentence I\'m told', 'this is a really long sentence...'],
    ])('maxLength(%i)', (input, out) => {
        expect(maxLength(input as string)).toBe(out);
    });
});
