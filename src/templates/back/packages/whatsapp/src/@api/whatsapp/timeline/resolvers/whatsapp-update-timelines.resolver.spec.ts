/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappUpdateTimelinesInput } from '@api/graphql';
import { WhatsappUpdateTimelinesHandler, WhatsappUpdateTimelinesResolver } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateTimelinesResolver', () =>
{
    let resolver: WhatsappUpdateTimelinesResolver;
    let handler: WhatsappUpdateTimelinesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappUpdateTimelinesResolver,
                {
                    provide : WhatsappUpdateTimelinesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappUpdateTimelinesResolver>(WhatsappUpdateTimelinesResolver);
        handler = module.get<WhatsappUpdateTimelinesHandler>(WhatsappUpdateTimelinesHandler);
    });

    test('WhatsappUpdateTimelinesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappUpdateTimelinesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a timelines updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockTimelineData[0])));
            expect(await resolver.main(<WhatsappUpdateTimelinesInput>whatsappMockTimelineData[0])).toBe(whatsappMockTimelineData[0]);
        });
    });
});
