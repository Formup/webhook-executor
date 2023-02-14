export type DataTypes =
    | { [key: string]: DataTypes }
    | string
    | number
    | boolean;

export const isValidData = (
    match: Record<string, DataTypes>,
    payload: Record<string, DataTypes>
): boolean => {
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
