import { WhatsappUpdateTimelineByIdController, WhatsappUpdateTimelineByIdHandler } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateTimelineByIdController', () =>
{
    let controller: WhatsappUpdateTimelineByIdController;
    let handler: WhatsappUpdateTimelineByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                WhatsappUpdateTimelineByIdController,
            ],
            providers: [
                {
                    provide : WhatsappUpdateTimelineByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappUpdateTimelineByIdController>(WhatsappUpdateTimelineByIdController);
        handler = module.get<WhatsappUpdateTimelineByIdHandler>(WhatsappUpdateTimelineByIdHandler);
    });

    describe('main', () =>
    {
        test('WhatsappUpdateTimelineByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a timeline updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockTimelineData[0])));
            expect(await controller.main(whatsappMockTimelineData[0])).toBe(whatsappMockTimelineData[0]);
        });
    });
});
