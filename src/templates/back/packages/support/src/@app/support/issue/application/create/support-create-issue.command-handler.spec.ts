import {
  SupportCreateIssueCommand,
  supportMockIssueData,
} from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';
import { SupportCreateIssueCommandHandler } from './support-create-issue.command-handler';
import { SupportCreateIssueService } from './support-create-issue.service';

describe('SupportCreateIssueCommandHandler', () => {
  let commandHandler: SupportCreateIssueCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportCreateIssueCommandHandler,
        {
          provide: SupportCreateIssueService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<SupportCreateIssueCommandHandler>(
      SupportCreateIssueCommandHandler,
    );
  });

  describe('main', () => {
    test('CreateIssueCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the values objects and pass them as parameters to the SupportCreateIssueService', async () => {
      expect(
        await commandHandler.execute(
          new SupportCreateIssueCommand(
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
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
