/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    SupportICommentRepository,
    supportMockCommentData,
    SupportMockCommentRepository,
} from '@app/support/comment';
import { SupportUpdateCommentByIdService } from '@app/support/comment/application/update/support-update-comment-by-id.service';
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

describe('SupportUpdateCommentByIdService', () => {
    let service: SupportUpdateCommentByIdService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                SupportUpdateCommentByIdService,
                SupportMockCommentRepository,
                {
                    provide: SupportICommentRepository,
                    useValue: {
                        updateById: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(SupportUpdateCommentByIdService);
    });

    describe('main', () => {
        test('SupportUpdateCommentByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should update a comment and emit event', async () => {
            expect(
                await service.main(
                    {
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
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
