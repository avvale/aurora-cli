/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageFindInboxSettingHandler } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxSettingHandler', () => {
    let handler: MessageFindInboxSettingHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageFindInboxSettingHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<MessageFindInboxSettingHandler>(
            MessageFindInboxSettingHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessageFindInboxSettingHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('MessageFindInboxSettingHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a inboxSetting', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(messageMockInboxSettingData[0]),
                    ),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                messageMockInboxSettingData[0],
            );
        });
    });
});
