/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    MessagePaginateMessagesHandler,
    MessagePaginateMessagesResolver,
} from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateMessagesResolver', () => {
    let resolver: MessagePaginateMessagesResolver;
    let handler: MessagePaginateMessagesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessagePaginateMessagesResolver,
                {
                    provide: MessagePaginateMessagesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessagePaginateMessagesResolver>(
            MessagePaginateMessagesResolver,
        );
        handler = module.get<MessagePaginateMessagesHandler>(
            MessagePaginateMessagesHandler,
        );
    });

    test('MessagePaginateMessagesResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessagePaginateMessagesResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a messageMockMessageData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: messageMockMessageData,
                        }),
                    ),
            );
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: messageMockMessageData,
            });
        });
    });
});
