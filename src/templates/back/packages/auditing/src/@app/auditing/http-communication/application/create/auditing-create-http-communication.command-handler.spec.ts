import {
  AuditingCreateHttpCommunicationCommand,
  auditingMockHttpCommunicationData,
} from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';
import { AuditingCreateHttpCommunicationCommandHandler } from './auditing-create-http-communication.command-handler';
import { AuditingCreateHttpCommunicationService } from './auditing-create-http-communication.service';

describe('AuditingCreateHttpCommunicationCommandHandler', () => {
  let commandHandler: AuditingCreateHttpCommunicationCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditingCreateHttpCommunicationCommandHandler,
        {
          provide: AuditingCreateHttpCommunicationService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<AuditingCreateHttpCommunicationCommandHandler>(
      AuditingCreateHttpCommunicationCommandHandler,
    );
  });

  describe('main', () => {
    test('CreateHttpCommunicationCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the values objects and pass them as parameters to the AuditingCreateHttpCommunicationService', async () => {
      expect(
        await commandHandler.execute(
          new AuditingCreateHttpCommunicationCommand(
            {
              id: auditingMockHttpCommunicationData[0].id,
              rowId: auditingMockHttpCommunicationData[0].rowId,
              tags: auditingMockHttpCommunicationData[0].tags,
              event: auditingMockHttpCommunicationData[0].event,
              status: auditingMockHttpCommunicationData[0].status,
              method: auditingMockHttpCommunicationData[0].method,
              url: auditingMockHttpCommunicationData[0].url,
              httpRequest: auditingMockHttpCommunicationData[0].httpRequest,
              httpRequestRejected:
                auditingMockHttpCommunicationData[0].httpRequestRejected,
              httpResponse: auditingMockHttpCommunicationData[0].httpResponse,
              httpResponseRejected:
                auditingMockHttpCommunicationData[0].httpResponseRejected,
              isReprocessing:
                auditingMockHttpCommunicationData[0].isReprocessing,
              reprocessingHttpCommunicationId:
                auditingMockHttpCommunicationData[0]
                  .reprocessingHttpCommunicationId,
            },
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
