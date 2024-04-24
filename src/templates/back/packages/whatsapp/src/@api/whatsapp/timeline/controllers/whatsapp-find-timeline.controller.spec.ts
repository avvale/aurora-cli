import { WhatsappFindTimelineController, WhatsappFindTimelineHandler } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindTimelineController', () =>
{
    let controller: WhatsappFindTimelineController;
    let handler: WhatsappFindTimelineHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                WhatsappFindTimelineController,
            ],
            providers: [
                {
                    provide : WhatsappFindTimelineHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappFindTimelineController>(WhatsappFindTimelineController);
        handler = module.get<WhatsappFindTimelineHandler>(WhatsappFindTimelineHandler);
    });

    describe('main', () =>
    {
        test('WhatsappFindTimelineController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a timeline', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockTimelineData[0])));
            expect(await controller.main()).toBe(whatsappMockTimelineData[0]);
        });
    });
});
