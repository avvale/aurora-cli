/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateInboxSettingByIdInput } from '@api/graphql';
import { MessageUpsertInboxSettingHandler, MessageUpsertInboxSettingResolver } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertInboxSettingResolver', () =>
{
    let resolver: MessageUpsertInboxSettingResolver;
    let handler: MessageUpsertInboxSettingHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageUpsertInboxSettingResolver,
                {
                    provide : MessageUpsertInboxSettingHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<MessageUpsertInboxSettingResolver>(MessageUpsertInboxSettingResolver);
        handler = module.get<MessageUpsertInboxSettingHandler>(MessageUpsertInboxSettingHandler);
    });

    test('MessageUpsertInboxSettingResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageUpsertInboxSettingResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an inboxSetting upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxSettingData[0])));
            expect(await resolver.main(<MessageUpdateInboxSettingByIdInput>messageMockInboxSettingData[0])).toBe(messageMockInboxSettingData[0]);
        });
    });
});
