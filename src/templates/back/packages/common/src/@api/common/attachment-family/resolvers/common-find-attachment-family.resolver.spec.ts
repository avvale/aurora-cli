/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindAttachmentFamilyHandler, CommonFindAttachmentFamilyResolver } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentFamilyResolver', () =>
{
    let resolver: CommonFindAttachmentFamilyResolver;
    let handler: CommonFindAttachmentFamilyHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindAttachmentFamilyResolver,
                {
                    provide : CommonFindAttachmentFamilyHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonFindAttachmentFamilyResolver>(CommonFindAttachmentFamilyResolver);
        handler = module.get<CommonFindAttachmentFamilyHandler>(CommonFindAttachmentFamilyHandler);
    });

    test('CommonFindAttachmentFamilyResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindAttachmentFamilyResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a attachmentFamily', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentFamilyData[0])));
            expect(await resolver.main()).toBe(commonMockAttachmentFamilyData[0]);
        });
    });
});
