import {
  AuditingDeleteHttpCommunicationByIdCommand,
  auditingMockHttpCommunicationData,
} from '@app/auditing/http-communication';
import { AuditingDeleteHttpCommunicationByIdCommandHandler } from '@app/auditing/http-communication/application/delete/auditing-delete-http-communication-by-id.command-handler';
import { AuditingDeleteHttpCommunicationByIdService } from '@app/auditing/http-communication/application/delete/auditing-delete-http-communication-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteHttpCommunicationByIdCommandHandler', () => {
  let commandHandler: AuditingDeleteHttpCommunicationByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditingDeleteHttpCommunicationByIdCommandHandler,
        {
          provide: AuditingDeleteHttpCommunicationByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler =
      module.get<AuditingDeleteHttpCommunicationByIdCommandHandler>(
        AuditingDeleteHttpCommunicationByIdCommandHandler,
      );
  });

  describe('main', () => {
    test('AuditingDeleteHttpCommunicationByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the value object id and pass them as parameters to the AuditingDeleteHttpCommunicationByIdService', async () => {
      expect(
        await commandHandler.execute(
          new AuditingDeleteHttpCommunicationByIdCommand(
            auditingMockHttpCommunicationData[0].id,
          ),
        ),
      ).toBe(undefined);
    });
  });
});
