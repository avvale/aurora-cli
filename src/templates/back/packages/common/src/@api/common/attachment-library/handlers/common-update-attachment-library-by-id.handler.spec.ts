/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateAttachmentLibraryByIdHandler } from '@api/common/attachment-library';
import { CommonUpdateAttachmentLibraryByIdInput } from '@api/graphql';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentLibraryByIdHandler', () =>
{
    let handler: CommonUpdateAttachmentLibraryByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAttachmentLibraryByIdHandler,
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

        handler = module.get<CommonUpdateAttachmentLibraryByIdHandler>(CommonUpdateAttachmentLibraryByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonUpdateAttachmentLibraryByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAttachmentLibraryByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a attachmentLibrary updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentLibraryData[0])));
            expect(
                await handler.main(
                    <CommonUpdateAttachmentLibraryByIdInput>commonMockAttachmentLibraryData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(commonMockAttachmentLibraryData[0]);
        });
    });
});
