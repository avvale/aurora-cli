import { MessageFindInboxByIdController, MessageFindInboxByIdHandler } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxByIdController', () =>
{
    let controller: MessageFindInboxByIdController;
    let handler: MessageFindInboxByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageFindInboxByIdController,
            ],
            providers: [
                {
                    provide : MessageFindInboxByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageFindInboxByIdController>(MessageFindInboxByIdController);
        handler = module.get<MessageFindInboxByIdHandler>(MessageFindInboxByIdHandler);
    });

    describe('main', () =>
    {
        test('MessageFindInboxByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an inbox by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxData[0])));
            expect(await controller.main(messageMockInboxData[0].id)).toBe(messageMockInboxData[0]);
        });
    });
});
