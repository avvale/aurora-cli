/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageCreateInboxSettingInput } from '@api/graphql';
import {
    MessageCreateInboxSettingHandler,
    MessageCreateInboxSettingResolver,
} from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateInboxSettingResolver', () => {
    let resolver: MessageCreateInboxSettingResolver;
    let handler: MessageCreateInboxSettingHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageCreateInboxSettingResolver,
                {
                    provide: MessageCreateInboxSettingHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageCreateInboxSettingResolver>(
            MessageCreateInboxSettingResolver,
        );
        handler = module.get<MessageCreateInboxSettingHandler>(
            MessageCreateInboxSettingHandler,
        );
    });

    test('MessageCreateInboxSettingResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageCreateInboxSettingResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an inboxSetting created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(messageMockInboxSettingData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <MessageCreateInboxSettingInput>(
                        messageMockInboxSettingData[0]
                    ),
                ),
            ).toBe(messageMockInboxSettingData[0]);
        });
    });
});
