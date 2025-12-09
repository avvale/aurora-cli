/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateOutboxByIdInput } from '@api/graphql';
import {
    MessageUpdateOutboxByIdHandler,
    MessageUpdateOutboxByIdResolver,
} from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateOutboxByIdResolver', () => {
    let resolver: MessageUpdateOutboxByIdResolver;
    let handler: MessageUpdateOutboxByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageUpdateOutboxByIdResolver,
                {
                    provide: MessageUpdateOutboxByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageUpdateOutboxByIdResolver>(
            MessageUpdateOutboxByIdResolver,
        );
        handler = module.get<MessageUpdateOutboxByIdHandler>(
            MessageUpdateOutboxByIdHandler,
        );
    });

    test('MessageUpdateOutboxByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageUpdateOutboxByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a outbox by id updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(messageMockOutboxData[0])),
            );
            expect(
                await resolver.main(
                    <MessageUpdateOutboxByIdInput>messageMockOutboxData[0],
                ),
            ).toBe(messageMockOutboxData[0]);
        });
    });
});
