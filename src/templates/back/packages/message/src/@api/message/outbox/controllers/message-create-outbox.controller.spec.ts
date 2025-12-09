import {
    MessageCreateOutboxController,
    MessageCreateOutboxHandler,
} from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateOutboxController', () => {
    let controller: MessageCreateOutboxController;
    let handler: MessageCreateOutboxHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [MessageCreateOutboxController],
            providers: [
                {
                    provide: MessageCreateOutboxHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<MessageCreateOutboxController>(
            MessageCreateOutboxController,
        );
        handler = module.get<MessageCreateOutboxHandler>(
            MessageCreateOutboxHandler,
        );
    });

    describe('main', () => {
        test('MessageCreateOutboxController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an outbox created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(messageMockOutboxData[0])),
            );
            expect(await controller.main(messageMockOutboxData[0])).toBe(
                messageMockOutboxData[0],
            );
        });
    });
});
