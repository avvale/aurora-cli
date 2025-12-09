/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    MessageFindOutboxByIdHandler,
    MessageFindOutboxByIdResolver,
} from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindOutboxByIdResolver', () => {
    let resolver: MessageFindOutboxByIdResolver;
    let handler: MessageFindOutboxByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageFindOutboxByIdResolver,
                {
                    provide: MessageFindOutboxByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageFindOutboxByIdResolver>(
            MessageFindOutboxByIdResolver,
        );
        handler = module.get<MessageFindOutboxByIdHandler>(
            MessageFindOutboxByIdHandler,
        );
    });

    test('MessageFindOutboxByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageFindOutboxByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an outbox by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(messageMockOutboxData[0])),
            );
            expect(await resolver.main(messageMockOutboxData[0].id)).toBe(
                messageMockOutboxData[0],
            );
        });
    });
});
