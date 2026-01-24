/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AuditingUpdateHttpCommunicationByIdHandler,
  AuditingUpdateHttpCommunicationByIdResolver,
} from '@api/auditing/http-communication';
import { AuditingUpdateHttpCommunicationByIdInput } from '@api/graphql';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpdateHttpCommunicationByIdResolver', () => {
  let resolver: AuditingUpdateHttpCommunicationByIdResolver;
  let handler: AuditingUpdateHttpCommunicationByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuditingUpdateHttpCommunicationByIdResolver,
        {
          provide: AuditingUpdateHttpCommunicationByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<AuditingUpdateHttpCommunicationByIdResolver>(
      AuditingUpdateHttpCommunicationByIdResolver,
    );
    handler = module.get<AuditingUpdateHttpCommunicationByIdHandler>(
      AuditingUpdateHttpCommunicationByIdHandler,
    );
  });

  test('AuditingUpdateHttpCommunicationByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('AuditingUpdateHttpCommunicationByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a httpCommunication by id updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(auditingMockHttpCommunicationData[0]),
            ),
        );
      expect(
        await resolver.main(
          <AuditingUpdateHttpCommunicationByIdInput>(
            auditingMockHttpCommunicationData[0]
          ),
        ),
      ).toBe(auditingMockHttpCommunicationData[0]);
    });
  });
});
