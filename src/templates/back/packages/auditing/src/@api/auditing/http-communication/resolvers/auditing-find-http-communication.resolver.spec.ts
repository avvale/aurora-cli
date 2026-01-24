/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AuditingFindHttpCommunicationHandler,
  AuditingFindHttpCommunicationResolver,
} from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindHttpCommunicationResolver', () => {
  let resolver: AuditingFindHttpCommunicationResolver;
  let handler: AuditingFindHttpCommunicationHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuditingFindHttpCommunicationResolver,
        {
          provide: AuditingFindHttpCommunicationHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<AuditingFindHttpCommunicationResolver>(
      AuditingFindHttpCommunicationResolver,
    );
    handler = module.get<AuditingFindHttpCommunicationHandler>(
      AuditingFindHttpCommunicationHandler,
    );
  });

  test('AuditingFindHttpCommunicationResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('AuditingFindHttpCommunicationResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a httpCommunication', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(auditingMockHttpCommunicationData[0]),
            ),
        );
      expect(await resolver.main()).toBe(auditingMockHttpCommunicationData[0]);
    });
  });
});
