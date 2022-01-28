import { environment } from 'environments/environment';

export const log = (message?: any, ...optionalParams: any[]): void =>
{
    if (environment.debug)
    {
        // console.trace();
        console.log(message, ...optionalParams);
    }
};
