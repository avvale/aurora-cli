/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateInboxSettingsInput } from '@api/graphql';
import { MessageUpdateInboxSettingsHandler } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateInboxSettingsHandler', () =>
{
    let handler: MessageUpdateInboxSettingsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageUpdateInboxSettingsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<MessageUpdateInboxSettingsHandler>(MessageUpdateInboxSettingsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessageUpdateInboxSettingsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageUpdateInboxSettingsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a inboxSettings updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxSettingData[0])));
            expect(
                await handler.main(
                    <MessageUpdateInboxSettingsInput>messageMockInboxSettingData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(messageMockInboxSettingData[0]);
        });
    });
});
