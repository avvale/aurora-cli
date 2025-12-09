/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    MessageFindMessageByIdHandler,
    MessageFindMessageByIdResolver,
} from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindMessageByIdResolver', () => {
    let resolver: MessageFindMessageByIdResolver;
    let handler: MessageFindMessageByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageFindMessageByIdResolver,
                {
                    provide: MessageFindMessageByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageFindMessageByIdResolver>(
            MessageFindMessageByIdResolver,
        );
        handler = module.get<MessageFindMessageByIdHandler>(
            MessageFindMessageByIdHandler,
        );
    });

    test('MessageFindMessageByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageFindMessageByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an message by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(messageMockMessageData[0]),
                    ),
            );
            expect(await resolver.main(messageMockMessageData[0].id)).toBe(
                messageMockMessageData[0],
            );
        });
    });
});
