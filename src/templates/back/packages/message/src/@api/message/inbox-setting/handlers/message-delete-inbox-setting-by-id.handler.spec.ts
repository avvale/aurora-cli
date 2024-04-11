/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageDeleteInboxSettingByIdHandler } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxSettingByIdController', () =>
{
    let handler: MessageDeleteInboxSettingByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageDeleteInboxSettingByIdHandler,
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

        handler = module.get<MessageDeleteInboxSettingByIdHandler>(MessageDeleteInboxSettingByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('MessageDeleteInboxSettingByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an inboxSetting deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxSettingData[0])));
            expect(
                await handler.main(
                    messageMockInboxSettingData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(messageMockInboxSettingData[0]);
        });
    });
});
