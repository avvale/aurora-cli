import {
    SupportCreateCommentCommand,
    supportMockCommentData,
} from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';
import { SupportCreateCommentCommandHandler } from './support-create-comment.command-handler';
import { SupportCreateCommentService } from './support-create-comment.service';

describe('SupportCreateCommentCommandHandler', () => {
    let commandHandler: SupportCreateCommentCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SupportCreateCommentCommandHandler,
                {
                    provide: SupportCreateCommentService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<SupportCreateCommentCommandHandler>(
            SupportCreateCommentCommandHandler,
        );
    });

    describe('main', () => {
        test('CreateCommentCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the SupportCreateCommentService', async () => {
            expect(
                await commandHandler.execute(
                    new SupportCreateCommentCommand(
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
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
