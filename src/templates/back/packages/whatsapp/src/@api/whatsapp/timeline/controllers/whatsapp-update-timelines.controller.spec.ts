import { WhatsappUpdateTimelinesController, WhatsappUpdateTimelinesHandler } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateTimelinesController', () =>
{
    let controller: WhatsappUpdateTimelinesController;
    let handler: WhatsappUpdateTimelinesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                WhatsappUpdateTimelinesController,
            ],
            providers: [
                {
                    provide : WhatsappUpdateTimelinesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappUpdateTimelinesController>(WhatsappUpdateTimelinesController);
        handler = module.get<WhatsappUpdateTimelinesHandler>(WhatsappUpdateTimelinesHandler);
    });

    describe('main', () =>
    {
        test('WhatsappUpdateTimelinesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a timelines updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockTimelineData[0])));
            expect(await controller.main(whatsappMockTimelineData[0])).toBe(whatsappMockTimelineData[0]);
        });
    });
});
