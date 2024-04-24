/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappGetTimelinesHandler, WhatsappGetTimelinesResolver } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappGetTimelinesResolver', () =>
{
    let resolver: WhatsappGetTimelinesResolver;
    let handler: WhatsappGetTimelinesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappGetTimelinesResolver,
                {
                    provide : WhatsappGetTimelinesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappGetTimelinesResolver>(WhatsappGetTimelinesResolver);
        handler = module.get<WhatsappGetTimelinesHandler>(WhatsappGetTimelinesHandler);
    });

    test('WhatsappGetTimelinesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappGetTimelinesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a whatsappMockTimelineData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockTimelineData)));
            expect(await resolver.main()).toBe(whatsappMockTimelineData);
        });
    });
});
