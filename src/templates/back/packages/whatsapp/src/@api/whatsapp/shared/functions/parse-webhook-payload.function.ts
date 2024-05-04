/* eslint-disable camelcase */
export const parseWebhookPayload = <T = any>(payload: T): string  =>
{
    return escapeForwardSlash(
        specialCharsToUnicode(
            JSON.stringify(payload),
        ),
    );
};

const escapeForwardSlash = (payload: string): string =>
{
    return payload.replace(/\//g, '\\/');
};

const specialCharsToUnicode = (payload: string): string =>
{
    return payload.replace(/[\u007F-\uFFFF]/g, (str: string) => '\\u' + ('0000' + str.charCodeAt(0).toString(16)).slice(-4));
};