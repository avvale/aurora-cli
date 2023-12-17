/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCreateBlobAttachmentHandler } from '../handlers/common-create-blob-attachment.handler';
import { CommonCreateBlobAttachmentResolver } from './common-create-blob-attachment.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateBlobAttachmentResolver', () =>
{
    let resolver: CommonCreateBlobAttachmentResolver;
    let handler: CommonCreateBlobAttachmentHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonCreateBlobAttachmentResolver,
                {
                    provide : CommonCreateBlobAttachmentHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonCreateBlobAttachmentResolver>(CommonCreateBlobAttachmentResolver);
        handler = module.get<CommonCreateBlobAttachmentHandler>(CommonCreateBlobAttachmentHandler);
    });

    test('CommonCreateBlobAttachmentResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateBlobAttachmentResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });
    });
});