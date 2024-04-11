/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateInboxSettingByIdInput } from '@api/graphql';
import { MessageUpdateInboxSettingByIdHandler, MessageUpdateInboxSettingByIdResolver } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateInboxSettingByIdResolver', () =>
{
    let resolver: MessageUpdateInboxSettingByIdResolver;
    let handler: MessageUpdateInboxSettingByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageUpdateInboxSettingByIdResolver,
                {
                    provide : MessageUpdateInboxSettingByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<MessageUpdateInboxSettingByIdResolver>(MessageUpdateInboxSettingByIdResolver);
        handler = module.get<MessageUpdateInboxSettingByIdHandler>(MessageUpdateInboxSettingByIdHandler);
    });

    test('MessageUpdateInboxSettingByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageUpdateInboxSettingByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a inboxSetting by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxSettingData[0])));
            expect(await resolver.main(<MessageUpdateInboxSettingByIdInput>messageMockInboxSettingData[0])).toBe(messageMockInboxSettingData[0]);
        });
    });
});
