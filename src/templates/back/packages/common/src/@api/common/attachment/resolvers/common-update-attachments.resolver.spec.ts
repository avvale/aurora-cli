/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateAttachmentsHandler, CommonUpdateAttachmentsResolver } from '@api/common/attachment';
import { CommonUpdateAttachmentsInput } from '@api/graphql';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentsResolver', () =>
{
    let resolver: CommonUpdateAttachmentsResolver;
    let handler: CommonUpdateAttachmentsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAttachmentsResolver,
                {
                    provide : CommonUpdateAttachmentsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateAttachmentsResolver>(CommonUpdateAttachmentsResolver);
        handler = module.get<CommonUpdateAttachmentsHandler>(CommonUpdateAttachmentsHandler);
    });

    test('CommonUpdateAttachmentsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAttachmentsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a attachments updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentData[0])));
            expect(await resolver.main(<CommonUpdateAttachmentsInput>commonMockAttachmentData[0])).toBe(commonMockAttachmentData[0]);
        });
    });
});
