/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonGetAttachmentLibrariesHandler, CommonGetAttachmentLibrariesResolver } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAttachmentLibrariesResolver', () =>
{
    let resolver: CommonGetAttachmentLibrariesResolver;
    let handler: CommonGetAttachmentLibrariesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonGetAttachmentLibrariesResolver,
                {
                    provide : CommonGetAttachmentLibrariesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonGetAttachmentLibrariesResolver>(CommonGetAttachmentLibrariesResolver);
        handler = module.get<CommonGetAttachmentLibrariesHandler>(CommonGetAttachmentLibrariesHandler);
    });

    test('CommonGetAttachmentLibrariesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonGetAttachmentLibrariesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a commonMockAttachmentLibraryData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentLibraryData)));
            expect(await resolver.main()).toBe(commonMockAttachmentLibraryData);
        });
    });
});
