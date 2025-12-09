/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    MessageFindMessageHandler,
    MessageFindMessageResolver,
} from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindMessageResolver', () => {
    let resolver: MessageFindMessageResolver;
    let handler: MessageFindMessageHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageFindMessageResolver,
                {
                    provide: MessageFindMessageHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageFindMessageResolver>(
            MessageFindMessageResolver,
        );
        handler = module.get<MessageFindMessageHandler>(
            MessageFindMessageHandler,
        );
    });

    test('MessageFindMessageResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageFindMessageResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a message', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(messageMockMessageData[0]),
                    ),
            );
            expect(await resolver.main()).toBe(messageMockMessageData[0]);
        });
    });
});
