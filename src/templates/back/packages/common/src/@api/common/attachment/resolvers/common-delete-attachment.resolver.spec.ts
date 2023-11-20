/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteAttachmentHandler } from '../handlers/common-delete-attachment.handler';
import { CommonDeleteAttachmentResolver } from './common-delete-attachment.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentResolver', () =>
{
    let resolver: CommonDeleteAttachmentResolver;
    let handler: CommonDeleteAttachmentHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteAttachmentResolver,
                {
                    provide : CommonDeleteAttachmentHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonDeleteAttachmentResolver>(CommonDeleteAttachmentResolver);
        handler = module.get<CommonDeleteAttachmentHandler>(CommonDeleteAttachmentHandler);
    });

    test('CommonDeleteAttachmentResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });
    });
});