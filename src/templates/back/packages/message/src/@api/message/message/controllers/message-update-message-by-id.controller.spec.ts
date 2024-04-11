import { MessageUpdateMessageByIdController, MessageUpdateMessageByIdHandler } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateMessageByIdController', () =>
{
    let controller: MessageUpdateMessageByIdController;
    let handler: MessageUpdateMessageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageUpdateMessageByIdController,
            ],
            providers: [
                {
                    provide : MessageUpdateMessageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageUpdateMessageByIdController>(MessageUpdateMessageByIdController);
        handler = module.get<MessageUpdateMessageByIdHandler>(MessageUpdateMessageByIdHandler);
    });

    describe('main', () =>
    {
        test('MessageUpdateMessageByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a message updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockMessageData[0])));
            expect(await controller.main(messageMockMessageData[0])).toBe(messageMockMessageData[0]);
        });
    });
});
