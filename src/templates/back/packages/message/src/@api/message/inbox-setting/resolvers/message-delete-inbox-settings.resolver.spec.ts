/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageDeleteInboxSettingsHandler, MessageDeleteInboxSettingsResolver } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxSettingsResolver', () =>
{
    let resolver: MessageDeleteInboxSettingsResolver;
    let handler: MessageDeleteInboxSettingsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageDeleteInboxSettingsResolver,
                {
                    provide : MessageDeleteInboxSettingsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<MessageDeleteInboxSettingsResolver>(MessageDeleteInboxSettingsResolver);
        handler = module.get<MessageDeleteInboxSettingsHandler>(MessageDeleteInboxSettingsHandler);
    });

    test('MessageDeleteInboxSettingsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageDeleteInboxSettingsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an messageMockInboxSettingData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxSettingData)));
            expect(await resolver.main()).toBe(messageMockInboxSettingData);
        });
    });
});
