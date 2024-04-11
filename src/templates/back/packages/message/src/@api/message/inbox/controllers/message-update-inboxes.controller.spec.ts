import { MessageUpdateInboxesController, MessageUpdateInboxesHandler } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateInboxesController', () =>
{
    let controller: MessageUpdateInboxesController;
    let handler: MessageUpdateInboxesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageUpdateInboxesController,
            ],
            providers: [
                {
                    provide : MessageUpdateInboxesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageUpdateInboxesController>(MessageUpdateInboxesController);
        handler = module.get<MessageUpdateInboxesHandler>(MessageUpdateInboxesHandler);
    });

    describe('main', () =>
    {
        test('MessageUpdateInboxesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a inboxes updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxData[0])));
            expect(await controller.main(messageMockInboxData[0])).toBe(messageMockInboxData[0]);
        });
    });
});
