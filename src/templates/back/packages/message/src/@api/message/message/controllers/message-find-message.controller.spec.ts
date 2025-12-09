import {
    MessageFindMessageController,
    MessageFindMessageHandler,
} from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindMessageController', () => {
    let controller: MessageFindMessageController;
    let handler: MessageFindMessageHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [MessageFindMessageController],
            providers: [
                {
                    provide: MessageFindMessageHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<MessageFindMessageController>(
            MessageFindMessageController,
        );
        handler = module.get<MessageFindMessageHandler>(
            MessageFindMessageHandler,
        );
    });

    describe('main', () => {
        test('MessageFindMessageController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a message', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(messageMockMessageData[0]),
                    ),
            );
            expect(await controller.main()).toBe(messageMockMessageData[0]);
        });
    });
});
