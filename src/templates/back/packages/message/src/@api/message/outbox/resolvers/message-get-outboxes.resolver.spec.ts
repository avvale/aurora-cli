/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    MessageGetOutboxesHandler,
    MessageGetOutboxesResolver,
} from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageGetOutboxesResolver', () => {
    let resolver: MessageGetOutboxesResolver;
    let handler: MessageGetOutboxesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageGetOutboxesResolver,
                {
                    provide: MessageGetOutboxesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageGetOutboxesResolver>(
            MessageGetOutboxesResolver,
        );
        handler = module.get<MessageGetOutboxesHandler>(
            MessageGetOutboxesHandler,
        );
    });

    test('MessageGetOutboxesResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageGetOutboxesResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a messageMockOutboxData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(messageMockOutboxData)),
            );
            expect(await resolver.main()).toBe(messageMockOutboxData);
        });
    });
});
