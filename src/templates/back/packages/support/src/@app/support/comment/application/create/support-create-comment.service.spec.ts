/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    SupportICommentRepository,
    supportMockCommentData,
    SupportMockCommentRepository,
} from '@app/support/comment';
import { SupportCreateCommentService } from '@app/support/comment/application/create/support-create-comment.service';
import {
    SupportCommentAccountId,
    SupportCommentAccountUsername,
    SupportCommentAttachments,
    SupportCommentDescription,
    SupportCommentDisplayName,
    SupportCommentExternalId,
    SupportCommentId,
    SupportCommentIssueId,
    SupportCommentMeta,
    SupportCommentRowId,
    SupportCommentScreenRecording,
} from '@app/support/comment/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportCreateCommentService', () => {
    let service: SupportCreateCommentService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                SupportCreateCommentService,
                SupportMockCommentRepository,
                {
                    provide: SupportICommentRepository,
                    useValue: {
                        create: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(SupportCreateCommentService);
    });

    describe('main', () => {
        test('SupportCreateCommentService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create a comment and emit event', async () => {
            expect(
                await service.main({
                    id: new SupportCommentId(supportMockCommentData[0].id),
                    rowId: new SupportCommentRowId(
                        supportMockCommentData[0].rowId,
                    ),
                    externalId: new SupportCommentExternalId(
                        supportMockCommentData[0].externalId,
                    ),
                    issueId: new SupportCommentIssueId(
                        supportMockCommentData[0].issueId,
                    ),
                    accountId: new SupportCommentAccountId(
                        supportMockCommentData[0].accountId,
                    ),
                    accountUsername: new SupportCommentAccountUsername(
                        supportMockCommentData[0].accountUsername,
                    ),
                    displayName: new SupportCommentDisplayName(
                        supportMockCommentData[0].displayName,
                    ),
                    description: new SupportCommentDescription(
                        supportMockCommentData[0].description,
                    ),
                    attachments: new SupportCommentAttachments(
                        supportMockCommentData[0].attachments,
                    ),
                    screenRecording: new SupportCommentScreenRecording(
                        supportMockCommentData[0].screenRecording,
                    ),
                    meta: new SupportCommentMeta(
                        supportMockCommentData[0].meta,
                    ),
                }),
            ).toBe(undefined);
        });
    });
});
