import { v4 as uuidv4, v5 as uuidv5, validate as uuidValidator, version as uuidVersion } from 'uuid';

export const uuid = (seed?: string): string =>
{
    if (seed)
    {
        const uuidSpaceName = '3eb6ecd7-2f06-4d41-934c-3f813c96982a';
        return uuidv5(seed, uuidSpaceName);
    }

    return uuidv4();
};

export const uuidValidate = (uuid: string, version: number = 4): boolean =>
{
    return uuidValidator(uuid) && uuidVersion(uuid) === version;
};