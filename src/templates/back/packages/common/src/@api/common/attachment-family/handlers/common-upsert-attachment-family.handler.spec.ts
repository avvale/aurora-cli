/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpsertAttachmentFamilyHandler } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAttachmentFamilyHandler', () =>
{
    let handler: CommonUpsertAttachmentFamilyHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpsertAttachmentFamilyHandler,
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

        handler = module.get<CommonUpsertAttachmentFamilyHandler>(CommonUpsertAttachmentFamilyHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('CommonUpsertAttachmentFamilyHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an attachmentFamily upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentFamilyData[0])));
            expect(
                await handler.main(
                    commonMockAttachmentFamilyData[0],
                    'Europe/Madrid',
                ))
                .toBe(commonMockAttachmentFamilyData[0]);
        });
    });
});
