import {
    supportMockCommentData,
    SupportUpdateCommentByIdCommand,
} from '@app/support/comment';
import { SupportUpdateCommentByIdCommandHandler } from '@app/support/comment/application/update/support-update-comment-by-id.command-handler';
import { SupportUpdateCommentByIdService } from '@app/support/comment/application/update/support-update-comment-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateCommentByIdCommandHandler', () => {
    let commandHandler: SupportUpdateCommentByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SupportUpdateCommentByIdCommandHandler,
                {
                    provide: SupportUpdateCommentByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<SupportUpdateCommentByIdCommandHandler>(
            SupportUpdateCommentByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdateCommentByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an comment created', async () => {
            expect(
                await commandHandler.execute(
                    new SupportUpdateCommentByIdCommand(
                        {
                            id: supportMockCommentData[0].id,
                            rowId: supportMockCommentData[0].rowId,
                            externalId: supportMockCommentData[0].externalId,
                            issueId: supportMockCommentData[0].issueId,
                            accountId: supportMockCommentData[0].accountId,
                            accountUsername:
                                supportMockCommentData[0].accountUsername,
                            displayName: supportMockCommentData[0].displayName,
                            description: supportMockCommentData[0].description,
                            attachments: supportMockCommentData[0].attachments,
                            screenRecording:
                                supportMockCommentData[0].screenRecording,
                            meta: supportMockCommentData[0].meta,
                        },
                        {},
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
