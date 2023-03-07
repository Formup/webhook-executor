export type DataTypes =
    | { [key: string]: DataTypes }
    | string
    | number
    | boolean;

export const isValidBody = (
    match: Record<string, DataTypes>,
    body: Record<string, DataTypes>
): boolean => {
    // eslint-disable-next-line
    return Object.keys(match).every((key) => {
        const value1 = match[key];
        const value2 = body[key];

        if (typeof value1 === 'object' && typeof value2 === 'object') {
            if (!isValidBody(value1, value2)) return false;
        } else if (value1 !== value2) {
            return false;
        }

        return true;
    });
};
