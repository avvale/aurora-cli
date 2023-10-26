/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteAttachmentsHandler, CommonDeleteAttachmentsResolver } from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentsResolver', () =>
{
    let resolver: CommonDeleteAttachmentsResolver;
    let handler: CommonDeleteAttachmentsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteAttachmentsResolver,
                {
                    provide : CommonDeleteAttachmentsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonDeleteAttachmentsResolver>(CommonDeleteAttachmentsResolver);
        handler = module.get<CommonDeleteAttachmentsHandler>(CommonDeleteAttachmentsHandler);
    });

    test('CommonDeleteAttachmentsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an commonMockAttachmentData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentData)));
            expect(await resolver.main()).toBe(commonMockAttachmentData);
        });
    });
});
