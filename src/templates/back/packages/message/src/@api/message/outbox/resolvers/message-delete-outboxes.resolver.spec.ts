/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    MessageDeleteOutboxesHandler,
    MessageDeleteOutboxesResolver,
} from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteOutboxesResolver', () => {
    let resolver: MessageDeleteOutboxesResolver;
    let handler: MessageDeleteOutboxesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageDeleteOutboxesResolver,
                {
                    provide: MessageDeleteOutboxesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageDeleteOutboxesResolver>(
            MessageDeleteOutboxesResolver,
        );
        handler = module.get<MessageDeleteOutboxesHandler>(
            MessageDeleteOutboxesHandler,
        );
    });

    test('MessageDeleteOutboxesResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageDeleteOutboxesResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an messageMockOutboxData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(messageMockOutboxData)),
            );
            expect(await resolver.main()).toBe(messageMockOutboxData);
        });
    });
});
