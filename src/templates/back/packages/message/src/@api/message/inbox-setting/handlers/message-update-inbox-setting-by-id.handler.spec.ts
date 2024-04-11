/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateInboxSettingByIdInput } from '@api/graphql';
import { MessageUpdateInboxSettingByIdHandler } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateInboxSettingByIdHandler', () =>
{
    let handler: MessageUpdateInboxSettingByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageUpdateInboxSettingByIdHandler,
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

        handler = module.get<MessageUpdateInboxSettingByIdHandler>(MessageUpdateInboxSettingByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessageUpdateInboxSettingByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageUpdateInboxSettingByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a inboxSetting updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxSettingData[0])));
            expect(
                await handler.main(
                    <MessageUpdateInboxSettingByIdInput>messageMockInboxSettingData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(messageMockInboxSettingData[0]);
        });
    });
});
