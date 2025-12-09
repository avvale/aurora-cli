import { MessageCreateInboxSettingsHandler } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateInboxSettingsHandler', () => {
    let handler: MessageCreateInboxSettingsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCreateInboxSettingsHandler,
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<MessageCreateInboxSettingsHandler>(
            MessageCreateInboxSettingsHandler,
        );
    });

    describe('main', () => {
        test('MessageCreateInboxSettingsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an messageMockInboxSettingData created', async () => {
            expect(await handler.main(messageMockInboxSettingData)).toBe(true);
        });
    });
});
