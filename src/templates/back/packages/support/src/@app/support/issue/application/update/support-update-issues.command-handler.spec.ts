import {
    supportMockIssueData,
    SupportUpdateIssuesCommand,
} from '@app/support/issue';
import { SupportUpdateIssuesCommandHandler } from '@app/support/issue/application/update/support-update-issues.command-handler';
import { SupportUpdateIssuesService } from '@app/support/issue/application/update/support-update-issues.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateIssuesCommandHandler', () => {
    let commandHandler: SupportUpdateIssuesCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SupportUpdateIssuesCommandHandler,
                {
                    provide: SupportUpdateIssuesService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<SupportUpdateIssuesCommandHandler>(
            SupportUpdateIssuesCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdateIssuesCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an issues updated', async () => {
            expect(
                await commandHandler.execute(
                    new SupportUpdateIssuesCommand(
                        {
                            id: supportMockIssueData[0].id,
                            rowId: supportMockIssueData[0].rowId,
                            externalId: supportMockIssueData[0].externalId,
                            externalStatus:
                                supportMockIssueData[0].externalStatus,
                            externalColorStatus:
                                supportMockIssueData[0].externalColorStatus,
                            accountId: supportMockIssueData[0].accountId,
                            accountUsername:
                                supportMockIssueData[0].accountUsername,
                            displayName: supportMockIssueData[0].displayName,
                            frontEnvironment:
                                supportMockIssueData[0].frontEnvironment,
                            frontVersion: supportMockIssueData[0].frontVersion,
                            backEnvironment:
                                supportMockIssueData[0].backEnvironment,
                            backVersion: supportMockIssueData[0].backVersion,
                            subject: supportMockIssueData[0].subject,
                            description: supportMockIssueData[0].description,
                            attachments: supportMockIssueData[0].attachments,
                            screenRecording:
                                supportMockIssueData[0].screenRecording,
                            meta: supportMockIssueData[0].meta,
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
