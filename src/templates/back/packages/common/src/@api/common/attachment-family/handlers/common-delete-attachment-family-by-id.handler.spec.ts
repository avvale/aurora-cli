/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteAttachmentFamilyByIdHandler } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentFamilyByIdController', () =>
{
    let handler: CommonDeleteAttachmentFamilyByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteAttachmentFamilyByIdHandler,
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

        handler = module.get<CommonDeleteAttachmentFamilyByIdHandler>(CommonDeleteAttachmentFamilyByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentFamilyByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an attachmentFamily deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentFamilyData[0])));
            expect(
                await handler.main(
                    commonMockAttachmentFamilyData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(commonMockAttachmentFamilyData[0]);
        });
    });
});
