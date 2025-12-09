import { MessageCreateOutboxInput } from '@api/graphql';
import {
    MessageCreateOutboxesHandler,
    MessageCreateOutboxesResolver,
} from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateOutboxesResolver', () => {
    let resolver: MessageCreateOutboxesResolver;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCreateOutboxesResolver,
                {
                    provide: MessageCreateOutboxesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageCreateOutboxesResolver>(
            MessageCreateOutboxesResolver,
        );
    });

    test('MessageCreateOutboxesResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageCreateOutboxesResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an outboxes created', async () => {
            expect(
                await resolver.main(
                    <MessageCreateOutboxInput[]>messageMockOutboxData,
                ),
            ).toBe(undefined);
        });
    });
});
