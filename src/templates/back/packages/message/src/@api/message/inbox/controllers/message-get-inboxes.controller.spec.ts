import {
    MessageGetInboxesController,
    MessageGetInboxesHandler,
} from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageGetInboxesController', () => {
    let controller: MessageGetInboxesController;
    let handler: MessageGetInboxesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [MessageGetInboxesController],
            providers: [
                {
                    provide: MessageGetInboxesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<MessageGetInboxesController>(
            MessageGetInboxesController,
        );
        handler = module.get<MessageGetInboxesHandler>(
            MessageGetInboxesHandler,
        );
    });

    describe('main', () => {
        test('MessageGetInboxesController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a messageMockInboxData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(messageMockInboxData)),
            );
            expect(await controller.main()).toBe(messageMockInboxData);
        });
    });
});
