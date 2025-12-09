import {
    MessageDeleteInboxSettingByIdCommand,
    messageMockInboxSettingData,
} from '@app/message/inbox-setting';
import { MessageDeleteInboxSettingByIdCommandHandler } from '@app/message/inbox-setting/application/delete/message-delete-inbox-setting-by-id.command-handler';
import { MessageDeleteInboxSettingByIdService } from '@app/message/inbox-setting/application/delete/message-delete-inbox-setting-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxSettingByIdCommandHandler', () => {
    let commandHandler: MessageDeleteInboxSettingByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageDeleteInboxSettingByIdCommandHandler,
                {
                    provide: MessageDeleteInboxSettingByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler =
            module.get<MessageDeleteInboxSettingByIdCommandHandler>(
                MessageDeleteInboxSettingByIdCommandHandler,
            );
    });

    describe('main', () => {
        test('MessageDeleteInboxSettingByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the MessageDeleteInboxSettingByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new MessageDeleteInboxSettingByIdCommand(
                        messageMockInboxSettingData[0].id,
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
