/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappFindTimelineHandler } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindTimelineHandler', () =>
{
    let handler: WhatsappFindTimelineHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappFindTimelineHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<WhatsappFindTimelineHandler>(WhatsappFindTimelineHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('WhatsappFindTimelineHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappFindTimelineHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a timeline', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(whatsappMockTimelineData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(whatsappMockTimelineData[0]);
        });
    });
});
