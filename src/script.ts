import { isValidBody, DataTypes } from './valid';

export const getFilePath = (
    // eslint-disable-next-line
    config: any,
    body: Record<string, DataTypes>
): string | undefined => {
    for (const object of config) {
        // eslint-disable-next-line
        const isValid = isValidBody(object.match, body);
        // eslint-disable-next-line
        if (isValid) return object.path;
    }
};
