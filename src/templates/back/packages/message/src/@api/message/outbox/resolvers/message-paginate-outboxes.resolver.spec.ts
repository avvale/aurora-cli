/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    MessagePaginateOutboxesHandler,
    MessagePaginateOutboxesResolver,
} from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateOutboxesResolver', () => {
    let resolver: MessagePaginateOutboxesResolver;
    let handler: MessagePaginateOutboxesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessagePaginateOutboxesResolver,
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

        resolver = module.get<MessagePaginateOutboxesResolver>(
            MessagePaginateOutboxesResolver,
        );
        handler = module.get<MessagePaginateOutboxesHandler>(
            MessagePaginateOutboxesHandler,
        );
    });

    test('MessagePaginateOutboxesResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessagePaginateOutboxesResolver should be defined', () => {
            expect(resolver).toBeDefined();
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
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: messageMockOutboxData,
            });
        });
    });
});
