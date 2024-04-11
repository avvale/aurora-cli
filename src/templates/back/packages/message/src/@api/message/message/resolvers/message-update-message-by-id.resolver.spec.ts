/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateMessageByIdInput } from '@api/graphql';
import { MessageUpdateMessageByIdHandler, MessageUpdateMessageByIdResolver } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateMessageByIdResolver', () =>
{
    let resolver: MessageUpdateMessageByIdResolver;
    let handler: MessageUpdateMessageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageUpdateMessageByIdResolver,
                {
                    provide : MessageUpdateMessageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<MessageUpdateMessageByIdResolver>(MessageUpdateMessageByIdResolver);
        handler = module.get<MessageUpdateMessageByIdHandler>(MessageUpdateMessageByIdHandler);
    });

    test('MessageUpdateMessageByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageUpdateMessageByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a message by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockMessageData[0])));
            expect(await resolver.main(<MessageUpdateMessageByIdInput>messageMockMessageData[0])).toBe(messageMockMessageData[0]);
        });
    });
});
