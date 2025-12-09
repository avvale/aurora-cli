/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    MessageFindInboxSettingByIdHandler,
    MessageFindInboxSettingByIdResolver,
} from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxSettingByIdResolver', () => {
    let resolver: MessageFindInboxSettingByIdResolver;
    let handler: MessageFindInboxSettingByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageFindInboxSettingByIdResolver,
                {
                    provide: MessageFindInboxSettingByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageFindInboxSettingByIdResolver>(
            MessageFindInboxSettingByIdResolver,
        );
        handler = module.get<MessageFindInboxSettingByIdHandler>(
            MessageFindInboxSettingByIdHandler,
        );
    });

    test('MessageFindInboxSettingByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageFindInboxSettingByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an inboxSetting by id', async () => {
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
