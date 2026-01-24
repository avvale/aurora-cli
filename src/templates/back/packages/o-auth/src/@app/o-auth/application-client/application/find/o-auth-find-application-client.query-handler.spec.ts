import {
  OAuthApplicationClientMapper,
  OAuthFindApplicationClientQuery,
  OAuthIApplicationClientRepository,
  OAuthMockApplicationClientRepository,
} from '@app/o-auth/application-client';
import { OAuthFindApplicationClientQueryHandler } from '@app/o-auth/application-client/application/find/o-auth-find-application-client.query-handler';
import { OAuthFindApplicationClientService } from '@app/o-auth/application-client/application/find/o-auth-find-application-client.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationClientQueryHandler', () => {
  let queryHandler: OAuthFindApplicationClientQueryHandler;
  let service: OAuthFindApplicationClientService;
  let repository: OAuthMockApplicationClientRepository;
  let mapper: OAuthApplicationClientMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OAuthFindApplicationClientQueryHandler,
        {
          provide: OAuthIApplicationClientRepository,
          useClass: OAuthMockApplicationClientRepository,
        },
        {
          provide: OAuthFindApplicationClientService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<OAuthFindApplicationClientQueryHandler>(
      OAuthFindApplicationClientQueryHandler,
    );
    service = module.get<OAuthFindApplicationClientService>(
      OAuthFindApplicationClientService,
    );
    repository = <OAuthMockApplicationClientRepository>(
      module.get<OAuthIApplicationClientRepository>(
        OAuthIApplicationClientRepository,
      )
    );
    mapper = new OAuthApplicationClientMapper();
  });

  describe('main', () => {
    test('OAuthFindApplicationClientQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an applicationClient founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(new OAuthFindApplicationClientQuery()),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
