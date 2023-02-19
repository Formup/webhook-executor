type DataTypes = { [key: string]: DataTypes } | string | number | boolean;

const isValidData = (
    match: Record<string, DataTypes>,
    payload: Record<string, DataTypes>
): boolean => {
    // eslint-disable-next-line
    return Object.entries(match).every(([key, value]) => {
        if (typeof value === 'object') {
            return isValidData(
                value as Record<string, DataTypes>,
                payload[key] as Record<string, DataTypes>
            );
        }

        return payload[key] === value;
    });
};

export const getScriptFile = (
    config: any,
    payload: Record<string, DataTypes>
): string | undefined => {
    for (const object of config) {
        // eslint-disable-next-line
        const isValid = isValidData(object.match, payload);
        if (!isValid) return;

        // eslint-disable-next-line
        return object.script;
    }
};
