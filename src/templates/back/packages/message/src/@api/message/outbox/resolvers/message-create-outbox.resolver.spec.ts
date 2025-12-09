/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageCreateOutboxInput } from '@api/graphql';
import {
    MessageCreateOutboxHandler,
    MessageCreateOutboxResolver,
} from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateOutboxResolver', () => {
    let resolver: MessageCreateOutboxResolver;
    let handler: MessageCreateOutboxHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageCreateOutboxResolver,
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

        resolver = module.get<MessageCreateOutboxResolver>(
            MessageCreateOutboxResolver,
        );
        handler = module.get<MessageCreateOutboxHandler>(
            MessageCreateOutboxHandler,
        );
    });

    test('MessageCreateOutboxResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageCreateOutboxResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an outbox created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(messageMockOutboxData[0])),
            );
            expect(
                await resolver.main(
                    <MessageCreateOutboxInput>messageMockOutboxData[0],
                ),
            ).toBe(messageMockOutboxData[0]);
        });
    });
});
