/* eslint-disable camelcase */
export const makeSendTemplatePayload = (
    {
        to,
        templateName,
        language,
        headerParameters,
        bodyParameters,
        buttons,
    }: {
        to: string;
        templateName: string;
        language: string;
        headerParameters: any[];
        bodyParameters: any[];
        buttons: any[];
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
        type             : 'template',
        template         : {
            name    : templateName,
            language: {
                code: language,
            },
            components: [
                {
                    type      : 'header',
                    parameters: headerParameters,
                },
                {
                    type      : 'body',
                    parameters: bodyParameters,
                },
                ...buttons,
            ],
        },
    };
};
