import { MessageUpsertInboxController, MessageUpsertInboxHandler } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertInboxController', () =>
{
    let controller: MessageUpsertInboxController;
    let handler: MessageUpsertInboxHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageUpsertInboxController,
            ],
            providers: [
                {
                    provide : MessageUpsertInboxHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageUpsertInboxController>(MessageUpsertInboxController);
        handler = module.get<MessageUpsertInboxHandler>(MessageUpsertInboxHandler);
    });

    describe('main', () =>
    {
        test('MessageUpsertInboxController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an inbox upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxData[0])));
            expect(await controller.main(messageMockInboxData[0])).toBe(messageMockInboxData[0]);
        });
    });
});
