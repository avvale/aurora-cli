import {
  OAuthApplicationClientMapper,
  OAuthGetApplicationsClientsQuery,
  OAuthIApplicationClientRepository,
  OAuthMockApplicationClientRepository,
} from '@app/o-auth/application-client';
import { OAuthGetApplicationsClientsQueryHandler } from '@app/o-auth/application-client/application/get/o-auth-get-applications-clients.query-handler';
import { OAuthGetApplicationsClientsService } from '@app/o-auth/application-client/application/get/o-auth-get-applications-clients.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetApplicationsClientsQueryHandler', () => {
  let queryHandler: OAuthGetApplicationsClientsQueryHandler;
  let service: OAuthGetApplicationsClientsService;
  let repository: OAuthMockApplicationClientRepository;
  let mapper: OAuthApplicationClientMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OAuthGetApplicationsClientsQueryHandler,
        {
          provide: OAuthIApplicationClientRepository,
          useClass: OAuthMockApplicationClientRepository,
        },
        {
          provide: OAuthGetApplicationsClientsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<OAuthGetApplicationsClientsQueryHandler>(
      OAuthGetApplicationsClientsQueryHandler,
    );
    service = module.get<OAuthGetApplicationsClientsService>(
      OAuthGetApplicationsClientsService,
    );
    repository = <OAuthMockApplicationClientRepository>(
      module.get<OAuthIApplicationClientRepository>(
        OAuthIApplicationClientRepository,
      )
    );
    mapper = new OAuthApplicationClientMapper();
  });

  describe('main', () => {
    test('OAuthGetApplicationsClientsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an applicationsClients founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(new OAuthGetApplicationsClientsQuery()),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});
