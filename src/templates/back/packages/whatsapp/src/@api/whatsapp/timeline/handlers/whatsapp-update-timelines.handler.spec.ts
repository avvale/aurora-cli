/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappUpdateTimelinesInput } from '@api/graphql';
import { WhatsappUpdateTimelinesHandler } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateTimelinesHandler', () =>
{
    let handler: WhatsappUpdateTimelinesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappUpdateTimelinesHandler,
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

        handler = module.get<WhatsappUpdateTimelinesHandler>(WhatsappUpdateTimelinesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('WhatsappUpdateTimelinesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappUpdateTimelinesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a timelines updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(whatsappMockTimelineData[0])));
            expect(
                await handler.main(
                    <WhatsappUpdateTimelinesInput>whatsappMockTimelineData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(whatsappMockTimelineData[0]);
        });
    });
});
