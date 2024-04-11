/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageDeleteOutboxByIdController, MessageDeleteOutboxByIdHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteOutboxByIdController', () =>
{
    let controller: MessageDeleteOutboxByIdController;
    let handler: MessageDeleteOutboxByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageDeleteOutboxByIdController,
            ],
            providers: [
                {
                    provide : MessageDeleteOutboxByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageDeleteOutboxByIdController>(MessageDeleteOutboxByIdController);
        handler = module.get<MessageDeleteOutboxByIdHandler>(MessageDeleteOutboxByIdHandler);
    });

    describe('main', () =>
    {
        test('MessageDeleteOutboxByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an outbox deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockOutboxData[0])));
            expect(await controller.main(messageMockOutboxData[0].id)).toBe(messageMockOutboxData[0]);
        });
    });
});
