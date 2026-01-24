/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingDeleteHttpCommunicationByIdHandler } from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteHttpCommunicationByIdController', () => {
  let handler: AuditingDeleteHttpCommunicationByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuditingDeleteHttpCommunicationByIdHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<AuditingDeleteHttpCommunicationByIdHandler>(
      AuditingDeleteHttpCommunicationByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('AuditingDeleteHttpCommunicationByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an httpCommunication deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(auditingMockHttpCommunicationData[0]),
            ),
        );
      expect(
        await handler.main(
          auditingMockHttpCommunicationData[0].id,
          {},
          'Europe/Madrid',
        ),
      ).toBe(auditingMockHttpCommunicationData[0]);
    });
  });
});
