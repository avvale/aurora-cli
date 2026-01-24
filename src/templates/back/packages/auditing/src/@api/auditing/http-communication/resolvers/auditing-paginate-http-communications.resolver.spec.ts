/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AuditingPaginateHttpCommunicationsHandler,
  AuditingPaginateHttpCommunicationsResolver,
} from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingPaginateHttpCommunicationsResolver', () => {
  let resolver: AuditingPaginateHttpCommunicationsResolver;
  let handler: AuditingPaginateHttpCommunicationsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuditingPaginateHttpCommunicationsResolver,
        {
          provide: AuditingPaginateHttpCommunicationsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<AuditingPaginateHttpCommunicationsResolver>(
      AuditingPaginateHttpCommunicationsResolver,
    );
    handler = module.get<AuditingPaginateHttpCommunicationsHandler>(
      AuditingPaginateHttpCommunicationsHandler,
    );
  });

  test('AuditingPaginateHttpCommunicationsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('AuditingPaginateHttpCommunicationsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a auditingMockHttpCommunicationData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: auditingMockHttpCommunicationData,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: auditingMockHttpCommunicationData,
      });
    });
  });
});
