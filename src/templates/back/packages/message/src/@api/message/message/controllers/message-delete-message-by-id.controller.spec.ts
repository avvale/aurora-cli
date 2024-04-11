/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageDeleteMessageByIdController, MessageDeleteMessageByIdHandler } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteMessageByIdController', () =>
{
    let controller: MessageDeleteMessageByIdController;
    let handler: MessageDeleteMessageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageDeleteMessageByIdController,
            ],
            providers: [
                {
                    provide : MessageDeleteMessageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageDeleteMessageByIdController>(MessageDeleteMessageByIdController);
        handler = module.get<MessageDeleteMessageByIdHandler>(MessageDeleteMessageByIdHandler);
    });

    describe('main', () =>
    {
        test('MessageDeleteMessageByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an message deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockMessageData[0])));
            expect(await controller.main(messageMockMessageData[0].id)).toBe(messageMockMessageData[0]);
        });
    });
});
