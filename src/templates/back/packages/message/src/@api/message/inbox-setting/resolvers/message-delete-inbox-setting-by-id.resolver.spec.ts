/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    MessageDeleteInboxSettingByIdHandler,
    MessageDeleteInboxSettingByIdResolver,
} from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxSettingByIdResolver', () => {
    let resolver: MessageDeleteInboxSettingByIdResolver;
    let handler: MessageDeleteInboxSettingByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageDeleteInboxSettingByIdResolver,
                {
                    provide: MessageDeleteInboxSettingByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageDeleteInboxSettingByIdResolver>(
            MessageDeleteInboxSettingByIdResolver,
        );
        handler = module.get<MessageDeleteInboxSettingByIdHandler>(
            MessageDeleteInboxSettingByIdHandler,
        );
    });

    test('MessageDeleteInboxSettingByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageDeleteInboxSettingByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an inboxSetting deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(messageMockInboxSettingData[0]),
                    ),
            );
            expect(await resolver.main(messageMockInboxSettingData[0].id)).toBe(
                messageMockInboxSettingData[0],
            );
        });
    });
});
