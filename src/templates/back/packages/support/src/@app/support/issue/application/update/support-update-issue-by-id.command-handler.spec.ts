import {
  supportMockIssueData,
  SupportUpdateIssueByIdCommand,
} from '@app/support/issue';
import { SupportUpdateIssueByIdCommandHandler } from '@app/support/issue/application/update/support-update-issue-by-id.command-handler';
import { SupportUpdateIssueByIdService } from '@app/support/issue/application/update/support-update-issue-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateIssueByIdCommandHandler', () => {
  let commandHandler: SupportUpdateIssueByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportUpdateIssueByIdCommandHandler,
        {
          provide: SupportUpdateIssueByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<SupportUpdateIssueByIdCommandHandler>(
      SupportUpdateIssueByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdateIssueByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an issue created', async () => {
      expect(
        await commandHandler.execute(
          new SupportUpdateIssueByIdCommand(
            {
              id: supportMockIssueData[0].id,
              rowId: supportMockIssueData[0].rowId,
              externalId: supportMockIssueData[0].externalId,
              externalStatus: supportMockIssueData[0].externalStatus,
              externalColorStatus: supportMockIssueData[0].externalColorStatus,
              accountId: supportMockIssueData[0].accountId,
              accountUsername: supportMockIssueData[0].accountUsername,
              displayName: supportMockIssueData[0].displayName,
              frontEnvironment: supportMockIssueData[0].frontEnvironment,
              frontVersion: supportMockIssueData[0].frontVersion,
              backEnvironment: supportMockIssueData[0].backEnvironment,
              backVersion: supportMockIssueData[0].backVersion,
              subject: supportMockIssueData[0].subject,
              description: supportMockIssueData[0].description,
              attachments: supportMockIssueData[0].attachments,
              screenRecording: supportMockIssueData[0].screenRecording,
              meta: supportMockIssueData[0].meta,
            },
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
