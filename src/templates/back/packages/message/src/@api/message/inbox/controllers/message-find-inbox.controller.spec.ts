import { MessageFindInboxController, MessageFindInboxHandler } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxController', () =>
{
    let controller: MessageFindInboxController;
    let handler: MessageFindInboxHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageFindInboxController,
            ],
            providers: [
                {
                    provide : MessageFindInboxHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageFindInboxController>(MessageFindInboxController);
        handler = module.get<MessageFindInboxHandler>(MessageFindInboxHandler);
    });

    describe('main', () =>
    {
        test('MessageFindInboxController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a inbox', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxData[0])));
            expect(await controller.main()).toBe(messageMockInboxData[0]);
        });
    });
});
