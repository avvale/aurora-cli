import {
  OAuthApplicationMapper,
  OAuthGetApplicationsQuery,
  OAuthIApplicationRepository,
  OAuthMockApplicationRepository,
} from '@app/o-auth/application';
import { OAuthGetApplicationsQueryHandler } from '@app/o-auth/application/application/get/o-auth-get-applications.query-handler';
import { OAuthGetApplicationsService } from '@app/o-auth/application/application/get/o-auth-get-applications.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetApplicationsQueryHandler', () => {
  let queryHandler: OAuthGetApplicationsQueryHandler;
  let service: OAuthGetApplicationsService;
  let repository: OAuthMockApplicationRepository;
  let mapper: OAuthApplicationMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OAuthGetApplicationsQueryHandler,
        {
          provide: OAuthIApplicationRepository,
          useClass: OAuthMockApplicationRepository,
        },
        {
          provide: OAuthGetApplicationsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<OAuthGetApplicationsQueryHandler>(
      OAuthGetApplicationsQueryHandler,
    );
    service = module.get<OAuthGetApplicationsService>(
      OAuthGetApplicationsService,
    );
    repository = <OAuthMockApplicationRepository>(
      module.get<OAuthIApplicationRepository>(OAuthIApplicationRepository)
    );
    mapper = new OAuthApplicationMapper();
  });

  describe('main', () => {
    test('OAuthGetApplicationsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an applications founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(new OAuthGetApplicationsQuery()),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});
