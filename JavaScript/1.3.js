/**
 * Recursively projects the source object based on the structure of the prototype object.
 * The resulting object will only contain properties that are present in both the source
 * and the prototype object, maintaining the values from the source object.
 *
 * @param {Object} source - The source object containing the original values.
 * @param {Object} prototype - The prototype object defining the desired structure.
 * @returns {Object} The projected object.
 */
function projectObject(source, prototype) {
    if (!isPlainObject(source) || !isPlainObject(prototype)) {
        return {};
    }

    const result = {};

    for (const key in prototype) {
        if (prototype.hasOwnProperty(key) && source.hasOwnProperty(key)) {
            if (isPlainObject(source[key]) && isPlainObject(prototype[key])) {
                result[key] = projectObject(source[key], prototype[key]);
            } else {
                result[key] = source[key];
            }
        }
    }

    return result;
}

/**
 * Checks if a value is a plain object (not an array, null, or other types).
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is a plain object, false otherwise.
 */
function isPlainObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

const src1 = {
    prop11: {
        prop21: 21,
        prop22: {
            prop31: 31,
            prop32: 32
        }
    },
    prop12: 12
};

const proto1 = {
    prop11: {
        prop22: null
    }
};

const src2 = {
    prop11: {
        prop21: 21,
        prop22: null
    },
    prop12: 12
};

const proto2 = {
    prop11: {
        prop22: {
            prop31: null
        }
    }
};

const src3 = null;
const proto3 = {
    prop11: {
        prop22: null
    }
};

const src4 = {
    prop11: {
        prop21: 21,
        prop22: {
            prop31: 31
        }
    }
};
const proto4 = {
    prop11: {}
};

const res1 = projectObject(src1, proto1);
const res2 = projectObject(src2, proto2);
const res3 = projectObject(src3, proto3);
const res4 = projectObject(src4, proto4);

console.log('Result 1:', JSON.stringify(res1, null, 2));
console.log('Result 2:', JSON.stringify(res2, null, 2));
console.log('Result 3:', JSON.stringify(res3, null, 2));
console.log('Result 4:', JSON.stringify(res4, null, 2));
