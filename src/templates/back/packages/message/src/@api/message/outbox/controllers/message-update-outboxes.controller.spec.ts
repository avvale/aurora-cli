import { MessageUpdateOutboxesController, MessageUpdateOutboxesHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateOutboxesController', () =>
{
    let controller: MessageUpdateOutboxesController;
    let handler: MessageUpdateOutboxesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageUpdateOutboxesController,
            ],
            providers: [
                {
                    provide : MessageUpdateOutboxesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageUpdateOutboxesController>(MessageUpdateOutboxesController);
        handler = module.get<MessageUpdateOutboxesHandler>(MessageUpdateOutboxesHandler);
    });

    describe('main', () =>
    {
        test('MessageUpdateOutboxesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a outboxes updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockOutboxData[0])));
            expect(await controller.main(messageMockOutboxData[0])).toBe(messageMockOutboxData[0]);
        });
    });
});
