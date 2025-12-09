/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    SupportIIssueRepository,
    supportMockIssueData,
    SupportMockIssueRepository,
} from '@app/support/issue';
import { SupportUpdateIssuesService } from '@app/support/issue/application/update/support-update-issues.service';
import {
    SupportIssueAccountId,
    SupportIssueAccountUsername,
    SupportIssueAttachments,
    SupportIssueBackEnvironment,
    SupportIssueBackVersion,
    SupportIssueDescription,
    SupportIssueDisplayName,
    SupportIssueExternalColorStatus,
    SupportIssueExternalId,
    SupportIssueExternalStatus,
    SupportIssueFrontEnvironment,
    SupportIssueFrontVersion,
    SupportIssueId,
    SupportIssueMeta,
    SupportIssueRowId,
    SupportIssueScreenRecording,
    SupportIssueSubject,
} from '@app/support/issue/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateIssuesService', () => {
    let service: SupportUpdateIssuesService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                SupportUpdateIssuesService,
                SupportMockIssueRepository,
                {
                    provide: SupportIIssueRepository,
                    useValue: {
                        update: () => {
                            /**/
                        },
                        get: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(SupportUpdateIssuesService);
    });

    describe('main', () => {
        test('UpdateIssuesService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should update a issues and emit event', async () => {
            expect(
                await service.main(
                    {
                        id: new SupportIssueId(supportMockIssueData[0].id),
                        rowId: new SupportIssueRowId(
                            supportMockIssueData[0].rowId,
                        ),
                        externalId: new SupportIssueExternalId(
                            supportMockIssueData[0].externalId,
                        ),
                        externalStatus: new SupportIssueExternalStatus(
                            supportMockIssueData[0].externalStatus,
                        ),
                        externalColorStatus:
                            new SupportIssueExternalColorStatus(
                                supportMockIssueData[0].externalColorStatus,
                            ),
                        accountId: new SupportIssueAccountId(
                            supportMockIssueData[0].accountId,
                        ),
                        accountUsername: new SupportIssueAccountUsername(
                            supportMockIssueData[0].accountUsername,
                        ),
                        displayName: new SupportIssueDisplayName(
                            supportMockIssueData[0].displayName,
                        ),
                        frontEnvironment: new SupportIssueFrontEnvironment(
                            supportMockIssueData[0].frontEnvironment,
                        ),
                        frontVersion: new SupportIssueFrontVersion(
                            supportMockIssueData[0].frontVersion,
                        ),
                        backEnvironment: new SupportIssueBackEnvironment(
                            supportMockIssueData[0].backEnvironment,
                        ),
                        backVersion: new SupportIssueBackVersion(
                            supportMockIssueData[0].backVersion,
                        ),
                        subject: new SupportIssueSubject(
                            supportMockIssueData[0].subject,
                        ),
                        description: new SupportIssueDescription(
                            supportMockIssueData[0].description,
                        ),
                        attachments: new SupportIssueAttachments(
                            supportMockIssueData[0].attachments,
                        ),
                        screenRecording: new SupportIssueScreenRecording(
                            supportMockIssueData[0].screenRecording,
                        ),
                        meta: new SupportIssueMeta(
                            supportMockIssueData[0].meta,
                        ),
                    },
                    {},
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
