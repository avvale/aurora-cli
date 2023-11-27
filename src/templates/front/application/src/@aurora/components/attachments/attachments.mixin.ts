import { inject } from '@angular/core';
import { FileUploaderService } from '@aurora';

type GConstructor<T> = new (...args: any[]) => T;
type GConstructorBase = GConstructor<{ /**/ }>;

export const AttachmentsMixin = <TBase extends GConstructorBase>(Base: TBase): any =>
{
    return class extends Base
    {
        fileUploaderService: FileUploaderService = inject(FileUploaderService);

        uploadFiles(): void
        {
            /**/
        }
    };
};