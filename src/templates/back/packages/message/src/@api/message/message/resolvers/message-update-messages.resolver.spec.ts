/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateMessagesInput } from '@api/graphql';
import {
    MessageUpdateMessagesHandler,
    MessageUpdateMessagesResolver,
} from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateMessagesResolver', () => {
    let resolver: MessageUpdateMessagesResolver;
    let handler: MessageUpdateMessagesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageUpdateMessagesResolver,
                {
                    provide: MessageUpdateMessagesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageUpdateMessagesResolver>(
            MessageUpdateMessagesResolver,
        );
        handler = module.get<MessageUpdateMessagesHandler>(
            MessageUpdateMessagesHandler,
        );
    });

    test('MessageUpdateMessagesResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageUpdateMessagesResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a messages updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(messageMockMessageData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <MessageUpdateMessagesInput>messageMockMessageData[0],
                ),
            ).toBe(messageMockMessageData[0]);
        });
    });
});
