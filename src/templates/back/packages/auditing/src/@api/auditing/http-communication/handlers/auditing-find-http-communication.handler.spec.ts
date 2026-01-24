/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingFindHttpCommunicationHandler } from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindHttpCommunicationHandler', () => {
  let handler: AuditingFindHttpCommunicationHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuditingFindHttpCommunicationHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<AuditingFindHttpCommunicationHandler>(
      AuditingFindHttpCommunicationHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('AuditingFindHttpCommunicationHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('AuditingFindHttpCommunicationHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a httpCommunication', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(auditingMockHttpCommunicationData[0]),
            ),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        auditingMockHttpCommunicationData[0],
      );
    });
  });
});
