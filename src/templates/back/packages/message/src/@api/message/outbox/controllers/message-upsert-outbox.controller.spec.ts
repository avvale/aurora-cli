import { MessageUpsertOutboxController, MessageUpsertOutboxHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertOutboxController', () =>
{
    let controller: MessageUpsertOutboxController;
    let handler: MessageUpsertOutboxHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageUpsertOutboxController,
            ],
            providers: [
                {
                    provide : MessageUpsertOutboxHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageUpsertOutboxController>(MessageUpsertOutboxController);
        handler = module.get<MessageUpsertOutboxHandler>(MessageUpsertOutboxHandler);
    });

    describe('main', () =>
    {
        test('MessageUpsertOutboxController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an outbox upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockOutboxData[0])));
            expect(await controller.main(messageMockOutboxData[0])).toBe(messageMockOutboxData[0]);
        });
    });
});
