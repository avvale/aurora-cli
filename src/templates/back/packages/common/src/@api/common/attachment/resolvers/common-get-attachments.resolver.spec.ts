/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonGetAttachmentsHandler, CommonGetAttachmentsResolver } from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAttachmentsResolver', () =>
{
    let resolver: CommonGetAttachmentsResolver;
    let handler: CommonGetAttachmentsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonGetAttachmentsResolver,
                {
                    provide : CommonGetAttachmentsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonGetAttachmentsResolver>(CommonGetAttachmentsResolver);
        handler = module.get<CommonGetAttachmentsHandler>(CommonGetAttachmentsHandler);
    });

    test('CommonGetAttachmentsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonGetAttachmentsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a commonMockAttachmentData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentData)));
            expect(await resolver.main()).toBe(commonMockAttachmentData);
        });
    });
});
