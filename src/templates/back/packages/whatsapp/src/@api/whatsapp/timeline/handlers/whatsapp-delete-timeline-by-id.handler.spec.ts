/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappDeleteTimelineByIdHandler } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteTimelineByIdController', () =>
{
    let handler: WhatsappDeleteTimelineByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappDeleteTimelineByIdHandler,
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

        handler = module.get<WhatsappDeleteTimelineByIdHandler>(WhatsappDeleteTimelineByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('WhatsappDeleteTimelineByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an timeline deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(whatsappMockTimelineData[0])));
            expect(
                await handler.main(
                    whatsappMockTimelineData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(whatsappMockTimelineData[0]);
        });
    });
});
