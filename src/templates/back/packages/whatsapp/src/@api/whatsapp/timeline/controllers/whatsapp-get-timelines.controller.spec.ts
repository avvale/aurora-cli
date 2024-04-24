import { WhatsappGetTimelinesController, WhatsappGetTimelinesHandler } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappGetTimelinesController', () =>
{
    let controller: WhatsappGetTimelinesController;
    let handler: WhatsappGetTimelinesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                WhatsappGetTimelinesController,
            ],
            providers: [
                {
                    provide : WhatsappGetTimelinesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappGetTimelinesController>(WhatsappGetTimelinesController);
        handler = module.get<WhatsappGetTimelinesHandler>(WhatsappGetTimelinesHandler);
    });

    describe('main', () =>
    {
        test('WhatsappGetTimelinesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a whatsappMockTimelineData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockTimelineData)));
            expect(await controller.main()).toBe(whatsappMockTimelineData);
        });
    });
});
