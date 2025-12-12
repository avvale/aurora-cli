import {
    supportMockCommentData,
    SupportUpdateCommentsCommand,
} from '@app/support/comment';
import { SupportUpdateCommentsCommandHandler } from '@app/support/comment/application/update/support-update-comments.command-handler';
import { SupportUpdateCommentsService } from '@app/support/comment/application/update/support-update-comments.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateCommentsCommandHandler', () => {
    let commandHandler: SupportUpdateCommentsCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SupportUpdateCommentsCommandHandler,
                {
                    provide: SupportUpdateCommentsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<SupportUpdateCommentsCommandHandler>(
            SupportUpdateCommentsCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdateCommentsCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an comments updated', async () => {
            expect(
                await commandHandler.execute(
                    new SupportUpdateCommentsCommand(
                        {
                            id: supportMockCommentData[0].id,
                            parentId: supportMockCommentData[0].parentId,
                            rowId: supportMockCommentData[0].rowId,
                            externalId: supportMockCommentData[0].externalId,
                            externalParentId:
                                supportMockCommentData[0].externalParentId,
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
                        {},
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
