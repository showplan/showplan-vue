import numbro from 'numbro';

const filterBytes = (value: number): string => numbro(value).format({
    output: 'byte',
    thousandSeparated: true,
    base: 'general',
    mantissa: 1,
});

const filterKiloBytes = (value: number): string => numbro(value * 1024).format({
    output: 'byte',
    thousandSeparated: true,
    base: 'general',
    mantissa: 1,
});

const filterSigfig = (value: number): string => {
    if (value > 100000) {
        return value.toExponential(2);
    }
    return numbro(value).format('0[.]0000');
};

const filterPercent = (value: number): string => numbro(value).format({ output: 'percent', mantissa: 0 });
const filterInteger = (value: number): string => numbro(value).format('0,0');
const stripBrackets = (value: string): string => value.split('[').join('').split(']').join('');
const ordinal = (value: number): string => numbro(value).format({ output: 'ordinal' });
const maxLength = (value: string, length: number = 30): string => {
    if (value.length < length) {
        return value;
    }
    return `${value.substring(0, length)}...`;
};

const allFilters = {
    filterBytes,
    filterKiloBytes,
    filterPercent,
    filterInteger,
    filterSigfig,
    stripBrackets,
    ordinal,
    maxLength,
};

export {
    filterBytes,
    filterKiloBytes,
    filterPercent,
    filterInteger,
    filterSigfig,
    stripBrackets,
    ordinal,
    maxLength,
    allFilters,
};
