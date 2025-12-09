/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageGetInboxSettingsHandler } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageGetInboxSettingsHandler', () => {
    let handler: MessageGetInboxSettingsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageGetInboxSettingsHandler,
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

        handler = module.get<MessageGetInboxSettingsHandler>(
            MessageGetInboxSettingsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessageGetInboxSettingsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('MessageGetInboxSettingsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a messageMockInboxSettingData', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(messageMockInboxSettingData),
                    ),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                messageMockInboxSettingData,
            );
        });
    });
});
