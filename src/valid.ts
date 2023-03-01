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
    return Object.entries(match).every(([key, value]) => {
        if (typeof value === 'object') {
            return isValidBody(
                value as Record<string, DataTypes>,
                body[key] as Record<string, DataTypes>
            );
        }

        return body[key] === value;
    });
};
