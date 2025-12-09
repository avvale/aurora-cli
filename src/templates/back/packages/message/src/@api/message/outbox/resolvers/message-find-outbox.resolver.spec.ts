/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    MessageFindOutboxHandler,
    MessageFindOutboxResolver,
} from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindOutboxResolver', () => {
    let resolver: MessageFindOutboxResolver;
    let handler: MessageFindOutboxHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageFindOutboxResolver,
                {
                    provide: MessageFindOutboxHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageFindOutboxResolver>(
            MessageFindOutboxResolver,
        );
        handler = module.get<MessageFindOutboxHandler>(
            MessageFindOutboxHandler,
        );
    });

    test('MessageFindOutboxResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageFindOutboxResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a outbox', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(messageMockOutboxData[0])),
            );
            expect(await resolver.main()).toBe(messageMockOutboxData[0]);
        });
    });
});
