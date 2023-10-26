/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteAttachmentByIdHandler } from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentByIdController', () =>
{
    let handler: CommonDeleteAttachmentByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteAttachmentByIdHandler,
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

        handler = module.get<CommonDeleteAttachmentByIdHandler>(CommonDeleteAttachmentByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an attachment deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockAttachmentData[0])));
            expect(
                await handler.main(
                    commonMockAttachmentData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(commonMockAttachmentData[0]);
        });
    });
});
