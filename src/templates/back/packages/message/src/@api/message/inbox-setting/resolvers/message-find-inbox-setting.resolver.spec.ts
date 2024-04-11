/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageFindInboxSettingHandler, MessageFindInboxSettingResolver } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxSettingResolver', () =>
{
    let resolver: MessageFindInboxSettingResolver;
    let handler: MessageFindInboxSettingHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageFindInboxSettingResolver,
                {
                    provide : MessageFindInboxSettingHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<MessageFindInboxSettingResolver>(MessageFindInboxSettingResolver);
        handler = module.get<MessageFindInboxSettingHandler>(MessageFindInboxSettingHandler);
    });

    test('MessageFindInboxSettingResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageFindInboxSettingResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a inboxSetting', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxSettingData[0])));
            expect(await resolver.main()).toBe(messageMockInboxSettingData[0]);
        });
    });
});
