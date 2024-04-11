/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageDeleteOutboxByIdHandler, MessageDeleteOutboxByIdResolver } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteOutboxByIdResolver', () =>
{
    let resolver: MessageDeleteOutboxByIdResolver;
    let handler: MessageDeleteOutboxByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageDeleteOutboxByIdResolver,
                {
                    provide : MessageDeleteOutboxByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<MessageDeleteOutboxByIdResolver>(MessageDeleteOutboxByIdResolver);
        handler = module.get<MessageDeleteOutboxByIdHandler>(MessageDeleteOutboxByIdHandler);
    });

    test('MessageDeleteOutboxByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageDeleteOutboxByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an outbox deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockOutboxData[0])));
            expect(await resolver.main(messageMockOutboxData[0].id)).toBe(messageMockOutboxData[0]);
        });
    });
});
