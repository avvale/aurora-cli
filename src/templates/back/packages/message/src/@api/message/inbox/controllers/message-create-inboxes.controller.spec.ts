import { MessageCreateInboxesController, MessageCreateInboxesHandler } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateInboxesController', () =>
{
    let controller: MessageCreateInboxesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                MessageCreateInboxesController,
            ],
            providers: [
                {
                    provide : MessageCreateInboxesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageCreateInboxesController>(MessageCreateInboxesController);
    });

    describe('main', () =>
    {
        test('MessageCreateInboxesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an messageMockInboxData created', async () =>
        {
            expect(
                await controller.main(
                    messageMockInboxData,
                ),
            )
                .toBe(undefined);
        });
    });
});
