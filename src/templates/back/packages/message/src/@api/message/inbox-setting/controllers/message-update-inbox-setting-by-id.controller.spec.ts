import {
    MessageUpdateInboxSettingByIdController,
    MessageUpdateInboxSettingByIdHandler,
} from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateInboxSettingByIdController', () => {
    let controller: MessageUpdateInboxSettingByIdController;
    let handler: MessageUpdateInboxSettingByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [MessageUpdateInboxSettingByIdController],
            providers: [
                {
                    provide: MessageUpdateInboxSettingByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<MessageUpdateInboxSettingByIdController>(
            MessageUpdateInboxSettingByIdController,
        );
        handler = module.get<MessageUpdateInboxSettingByIdHandler>(
            MessageUpdateInboxSettingByIdHandler,
        );
    });

    describe('main', () => {
        test('MessageUpdateInboxSettingByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a inboxSetting updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(messageMockInboxSettingData[0]),
                    ),
            );
            expect(await controller.main(messageMockInboxSettingData[0])).toBe(
                messageMockInboxSettingData[0],
            );
        });
    });
});
