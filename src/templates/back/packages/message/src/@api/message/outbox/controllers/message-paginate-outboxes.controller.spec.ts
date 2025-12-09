import {
    MessagePaginateOutboxesController,
    MessagePaginateOutboxesHandler,
} from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateOutboxesController', () => {
    let controller: MessagePaginateOutboxesController;
    let handler: MessagePaginateOutboxesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [MessagePaginateOutboxesController],
            providers: [
                {
                    provide: MessagePaginateOutboxesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<MessagePaginateOutboxesController>(
            MessagePaginateOutboxesController,
        );
        handler = module.get<MessagePaginateOutboxesHandler>(
            MessagePaginateOutboxesHandler,
        );
    });

    describe('main', () => {
        test('MessagePaginateOutboxesController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a messageMockOutboxData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: messageMockOutboxData,
                        }),
                    ),
            );
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: messageMockOutboxData,
            });
        });
    });
});
