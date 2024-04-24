/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappGetTimelinesHandler } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappGetTimelinesHandler', () =>
{
    let handler: WhatsappGetTimelinesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappGetTimelinesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<WhatsappGetTimelinesHandler>(WhatsappGetTimelinesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('WhatsappGetTimelinesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappGetTimelinesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a whatsappMockTimelineData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(whatsappMockTimelineData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(whatsappMockTimelineData);
        });
    });
});
