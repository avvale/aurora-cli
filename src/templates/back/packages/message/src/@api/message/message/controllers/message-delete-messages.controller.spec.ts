import {
    MessageDeleteMessagesController,
    MessageDeleteMessagesHandler,
} from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteMessagesController', () => {
    let controller: MessageDeleteMessagesController;
    let handler: MessageDeleteMessagesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [MessageDeleteMessagesController],
            providers: [
                {
                    provide: MessageDeleteMessagesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<MessageDeleteMessagesController>(
            MessageDeleteMessagesController,
        );
        handler = module.get<MessageDeleteMessagesHandler>(
            MessageDeleteMessagesHandler,
        );
    });

    describe('main', () => {
        test('MessageDeleteMessagesController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an messageMockMessageData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(messageMockMessageData)),
            );
            expect(await controller.main()).toBe(messageMockMessageData);
        });
    });
});
