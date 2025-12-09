/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateOutboxesInput } from '@api/graphql';
import {
    MessageUpdateOutboxesHandler,
    MessageUpdateOutboxesResolver,
} from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateOutboxesResolver', () => {
    let resolver: MessageUpdateOutboxesResolver;
    let handler: MessageUpdateOutboxesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageUpdateOutboxesResolver,
                {
                    provide: MessageUpdateOutboxesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageUpdateOutboxesResolver>(
            MessageUpdateOutboxesResolver,
        );
        handler = module.get<MessageUpdateOutboxesHandler>(
            MessageUpdateOutboxesHandler,
        );
    });

    test('MessageUpdateOutboxesResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageUpdateOutboxesResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a outboxes updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(messageMockOutboxData[0])),
            );
            expect(
                await resolver.main(
                    <MessageUpdateOutboxesInput>messageMockOutboxData[0],
                ),
            ).toBe(messageMockOutboxData[0]);
        });
    });
});
