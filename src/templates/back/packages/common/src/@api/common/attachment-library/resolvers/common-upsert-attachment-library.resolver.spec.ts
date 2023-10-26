/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpsertAttachmentLibraryHandler, CommonUpsertAttachmentLibraryResolver } from '@api/common/attachment-library';
import { CommonUpdateAttachmentLibraryByIdInput } from '@api/graphql';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAttachmentLibraryResolver', () =>
{
    let resolver: CommonUpsertAttachmentLibraryResolver;
    let handler: CommonUpsertAttachmentLibraryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpsertAttachmentLibraryResolver,
                {
                    provide : CommonUpsertAttachmentLibraryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpsertAttachmentLibraryResolver>(CommonUpsertAttachmentLibraryResolver);
        handler = module.get<CommonUpsertAttachmentLibraryHandler>(CommonUpsertAttachmentLibraryHandler);
    });

    test('CommonUpsertAttachmentLibraryResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpsertAttachmentLibraryResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an attachmentLibrary upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentLibraryData[0])));
            expect(await resolver.main(<CommonUpdateAttachmentLibraryByIdInput>commonMockAttachmentLibraryData[0])).toBe(commonMockAttachmentLibraryData[0]);
        });
    });
});
