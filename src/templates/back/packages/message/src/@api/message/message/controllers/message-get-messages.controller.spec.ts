import {
    MessageGetMessagesController,
    MessageGetMessagesHandler,
} from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageGetMessagesController', () => {
    let controller: MessageGetMessagesController;
    let handler: MessageGetMessagesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [MessageGetMessagesController],
            providers: [
                {
                    provide: MessageGetMessagesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<MessageGetMessagesController>(
            MessageGetMessagesController,
        );
        handler = module.get<MessageGetMessagesHandler>(
            MessageGetMessagesHandler,
        );
    });

    describe('main', () => {
        test('MessageGetMessagesController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a messageMockMessageData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(messageMockMessageData)),
            );
            expect(await controller.main()).toBe(messageMockMessageData);
        });
    });
});
