/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AuditingFindHttpCommunicationByIdHandler,
  AuditingFindHttpCommunicationByIdResolver,
} from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindHttpCommunicationByIdResolver', () => {
  let resolver: AuditingFindHttpCommunicationByIdResolver;
  let handler: AuditingFindHttpCommunicationByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuditingFindHttpCommunicationByIdResolver,
        {
          provide: AuditingFindHttpCommunicationByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<AuditingFindHttpCommunicationByIdResolver>(
      AuditingFindHttpCommunicationByIdResolver,
    );
    handler = module.get<AuditingFindHttpCommunicationByIdHandler>(
      AuditingFindHttpCommunicationByIdHandler,
    );
  });

  test('AuditingFindHttpCommunicationByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('AuditingFindHttpCommunicationByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an httpCommunication by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(auditingMockHttpCommunicationData[0]),
            ),
        );
      expect(await resolver.main(auditingMockHttpCommunicationData[0].id)).toBe(
        auditingMockHttpCommunicationData[0],
      );
    });
  });
});
