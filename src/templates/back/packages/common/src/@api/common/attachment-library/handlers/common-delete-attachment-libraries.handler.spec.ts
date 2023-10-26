/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteAttachmentLibrariesHandler } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentLibrariesHandler', () =>
{
    let handler: CommonDeleteAttachmentLibrariesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteAttachmentLibrariesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<CommonDeleteAttachmentLibrariesHandler>(CommonDeleteAttachmentLibrariesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonDeleteAttachmentLibrariesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentLibrariesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an commonMockAttachmentLibraryData deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentLibraryData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(commonMockAttachmentLibraryData);
        });
    });
});
