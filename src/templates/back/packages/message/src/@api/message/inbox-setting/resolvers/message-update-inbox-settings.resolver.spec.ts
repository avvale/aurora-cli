/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateInboxSettingsInput } from '@api/graphql';
import {
    MessageUpdateInboxSettingsHandler,
    MessageUpdateInboxSettingsResolver,
} from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateInboxSettingsResolver', () => {
    let resolver: MessageUpdateInboxSettingsResolver;
    let handler: MessageUpdateInboxSettingsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageUpdateInboxSettingsResolver,
                {
                    provide: MessageUpdateInboxSettingsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageUpdateInboxSettingsResolver>(
            MessageUpdateInboxSettingsResolver,
        );
        handler = module.get<MessageUpdateInboxSettingsHandler>(
            MessageUpdateInboxSettingsHandler,
        );
    });

    test('MessageUpdateInboxSettingsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageUpdateInboxSettingsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a inboxSettings updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(messageMockInboxSettingData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <MessageUpdateInboxSettingsInput>(
                        messageMockInboxSettingData[0]
                    ),
                ),
            ).toBe(messageMockInboxSettingData[0]);
        });
    });
});
