import { StorageAccountSharedAccessSignatureService } from '..';

export const storageAccountApplySharedAccessSignatureFunction = (
    url: string,
    storageAccountSharedAccessSignatureService: StorageAccountSharedAccessSignatureService,
    {
        expiration = undefined,
        wrapperObject = undefined,
    }: { expiration?: number; wrapperObject?: any } = {},
): string => {
    if (storageAccountSharedAccessSignatureService && url) {
        try {
            return {
                ...wrapperObject,
                url: storageAccountSharedAccessSignatureService.generateReadSharedAccessSignature(
                    url,
                    expiration,
                ),
            };
        } catch (e) {
            console.error(e);
        }
    }
    return wrapperObject || url;
};
