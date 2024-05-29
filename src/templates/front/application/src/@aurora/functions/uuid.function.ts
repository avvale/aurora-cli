import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

export const uuid = (seed?: string): string =>
{
    if (seed)
    {
        const uuidSpaceName = '3eb6ecd7-2f06-4d41-934c-3f813c96982a';
        return uuidv5(seed, uuidSpaceName);
    }

    return uuidv4();
};