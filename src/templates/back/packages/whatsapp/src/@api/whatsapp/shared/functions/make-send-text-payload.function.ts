/* eslint-disable camelcase */
export const makeSendTextPayload = (
    {
        to,
        text,
        previewUrl = false,
    }: {
        to: string;
        text: string;
        previewUrl: boolean;
    },
): {
    to: string;
    [key: string]: any;
} =>
{
    return {
        messaging_product: 'whatsapp',
        recipient_type   : 'individual',
        to,
        type             : 'text',
        text             : {
            preview_url: previewUrl,
            body       : text,
        },
    };
};
