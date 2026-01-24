import {
  OAuthIApplicationClientRepository,
  OAuthMockApplicationClientRepository,
} from '@app/o-auth/application-client';
import { OAuthPaginateApplicationsClientsService } from '@app/o-auth/application-client/application/paginate/o-auth-paginate-applications-clients.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateApplicationsClientsService', () => {
  let service: OAuthPaginateApplicationsClientsService;
  let repository: OAuthIApplicationClientRepository;
  let mockRepository: OAuthMockApplicationClientRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        OAuthPaginateApplicationsClientsService,
        OAuthMockApplicationClientRepository,
        {
          provide: OAuthIApplicationClientRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(OAuthPaginateApplicationsClientsService);
    repository = module.get(OAuthIApplicationClientRepository);
    mockRepository = module.get(OAuthMockApplicationClientRepository);
  });

  describe('main', () => {
    test('OAuthPaginateApplicationsClientsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate applicationsClients', async () => {
      jest.spyOn(repository, 'paginate').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: mockRepository.collectionSource.slice(0, 10).length,
              count: mockRepository.collectionSource.slice(0, 10).length,
              rows: mockRepository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await service.main({
          offset: 0,
          limit: 10,
        }),
      ).toStrictEqual({
        total: mockRepository.collectionSource.slice(0, 10).length,
        count: mockRepository.collectionSource.slice(0, 10).length,
        rows: mockRepository.collectionSource.slice(0, 10),
      });
    });
  });
});
