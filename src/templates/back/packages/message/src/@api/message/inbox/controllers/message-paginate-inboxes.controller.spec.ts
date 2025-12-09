import {
    MessagePaginateInboxesController,
    MessagePaginateInboxesHandler,
} from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateInboxesController', () => {
    let controller: MessagePaginateInboxesController;
    let handler: MessagePaginateInboxesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [MessagePaginateInboxesController],
            providers: [
                {
                    provide: MessagePaginateInboxesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<MessagePaginateInboxesController>(
            MessagePaginateInboxesController,
        );
        handler = module.get<MessagePaginateInboxesHandler>(
            MessagePaginateInboxesHandler,
        );
    });

    describe('main', () => {
        test('MessagePaginateInboxesController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a messageMockInboxData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: messageMockInboxData,
                        }),
                    ),
            );
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: messageMockInboxData,
            });
        });
    });
});
