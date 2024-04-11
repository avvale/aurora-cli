import { MessageCreateInboxController, MessageCreateInboxHandler } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateInboxController', () =>
{
    let controller: MessageCreateInboxController;
    let handler: MessageCreateInboxHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageCreateInboxController,
            ],
            providers: [
                {
                    provide : MessageCreateInboxHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageCreateInboxController>(MessageCreateInboxController);
        handler = module.get<MessageCreateInboxHandler>(MessageCreateInboxHandler);
    });

    describe('main', () =>
    {
        test('MessageCreateInboxController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an inbox created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxData[0])));
            expect(
                await controller.main(
                    messageMockInboxData[0],
                ),
            )
                .toBe(messageMockInboxData[0]);
        });
    });
});
