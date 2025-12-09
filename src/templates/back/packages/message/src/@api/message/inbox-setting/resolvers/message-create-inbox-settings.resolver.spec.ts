import { MessageCreateInboxSettingInput } from '@api/graphql';
import {
    MessageCreateInboxSettingsHandler,
    MessageCreateInboxSettingsResolver,
} from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateInboxSettingsResolver', () => {
    let resolver: MessageCreateInboxSettingsResolver;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCreateInboxSettingsResolver,
                {
                    provide: MessageCreateInboxSettingsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageCreateInboxSettingsResolver>(
            MessageCreateInboxSettingsResolver,
        );
    });

    test('MessageCreateInboxSettingsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageCreateInboxSettingsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an inboxSettings created', async () => {
            expect(
                await resolver.main(
                    <MessageCreateInboxSettingInput[]>(
                        messageMockInboxSettingData
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
