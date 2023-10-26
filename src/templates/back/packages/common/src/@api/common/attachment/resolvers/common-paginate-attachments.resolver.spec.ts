/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonPaginateAttachmentsHandler, CommonPaginateAttachmentsResolver } from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAttachmentsResolver', () =>
{
    let resolver: CommonPaginateAttachmentsResolver;
    let handler: CommonPaginateAttachmentsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonPaginateAttachmentsResolver,
                {
                    provide : CommonPaginateAttachmentsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonPaginateAttachmentsResolver>(CommonPaginateAttachmentsResolver);
        handler = module.get<CommonPaginateAttachmentsHandler>(CommonPaginateAttachmentsHandler);
    });

    test('CommonPaginateAttachmentsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonPaginateAttachmentsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a commonMockAttachmentData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : commonMockAttachmentData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : commonMockAttachmentData,
            });
        });
    });
});
