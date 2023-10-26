/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUploadAttachmentsHandler } from '../handlers/common-upload-attachments.handler';
import { CommonUploadAttachmentsResolver } from './common-upload-attachments.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUploadAttachmentsResolver', () =>
{
    let resolver: CommonUploadAttachmentsResolver;
    let handler: CommonUploadAttachmentsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUploadAttachmentsResolver,
                {
                    provide : CommonUploadAttachmentsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUploadAttachmentsResolver>(CommonUploadAttachmentsResolver);
        handler = module.get<CommonUploadAttachmentsHandler>(CommonUploadAttachmentsHandler);
    });

    test('CommonUploadAttachmentsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUploadAttachmentsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });
    });
});