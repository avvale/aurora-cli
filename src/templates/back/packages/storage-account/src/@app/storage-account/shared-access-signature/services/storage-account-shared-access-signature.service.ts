export abstract class StorageAccountSharedAccessSignatureService {
  abstract generateReadSharedAccessSignature(
    url: string,
    expiration: number,
  ): string;
}
