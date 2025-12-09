import {
    MessageFindOutboxByIdController,
    MessageFindOutboxByIdHandler,
} from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindOutboxByIdController', () => {
    let controller: MessageFindOutboxByIdController;
    let handler: MessageFindOutboxByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [MessageFindOutboxByIdController],
            providers: [
                {
                    provide: MessageFindOutboxByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<MessageFindOutboxByIdController>(
            MessageFindOutboxByIdController,
        );
        handler = module.get<MessageFindOutboxByIdHandler>(
            MessageFindOutboxByIdHandler,
        );
    });

    describe('main', () => {
        test('MessageFindOutboxByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an outbox by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(messageMockOutboxData[0])),
            );
            expect(await controller.main(messageMockOutboxData[0].id)).toBe(
                messageMockOutboxData[0],
            );
        });
    });
});
