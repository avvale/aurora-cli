/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    MessagePaginateInboxesHandler,
    MessagePaginateInboxesResolver,
} from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateInboxesResolver', () => {
    let resolver: MessagePaginateInboxesResolver;
    let handler: MessagePaginateInboxesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessagePaginateInboxesResolver,
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

        resolver = module.get<MessagePaginateInboxesResolver>(
            MessagePaginateInboxesResolver,
        );
        handler = module.get<MessagePaginateInboxesHandler>(
            MessagePaginateInboxesHandler,
        );
    });

    test('MessagePaginateInboxesResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessagePaginateInboxesResolver should be defined', () => {
            expect(resolver).toBeDefined();
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
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: messageMockInboxData,
            });
        });
    });
});
