/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindAttachmentLibraryHandler, CommonFindAttachmentLibraryResolver } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentLibraryResolver', () =>
{
    let resolver: CommonFindAttachmentLibraryResolver;
    let handler: CommonFindAttachmentLibraryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindAttachmentLibraryResolver,
                {
                    provide : CommonFindAttachmentLibraryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonFindAttachmentLibraryResolver>(CommonFindAttachmentLibraryResolver);
        handler = module.get<CommonFindAttachmentLibraryHandler>(CommonFindAttachmentLibraryHandler);
    });

    test('CommonFindAttachmentLibraryResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindAttachmentLibraryResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a attachmentLibrary', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentLibraryData[0])));
            expect(await resolver.main()).toBe(commonMockAttachmentLibraryData[0]);
        });
    });
});
