import {
  OAuthApplicationClientMapper,
  OAuthFindApplicationClientByIdQuery,
  OAuthIApplicationClientRepository,
  oAuthMockApplicationClientData,
  OAuthMockApplicationClientRepository,
} from '@app/o-auth/application-client';
import { OAuthFindApplicationClientByIdQueryHandler } from '@app/o-auth/application-client/application/find/o-auth-find-application-client-by-id.query-handler';
import { OAuthFindApplicationClientByIdService } from '@app/o-auth/application-client/application/find/o-auth-find-application-client-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationClientByIdQueryHandler', () => {
  let queryHandler: OAuthFindApplicationClientByIdQueryHandler;
  let service: OAuthFindApplicationClientByIdService;
  let repository: OAuthMockApplicationClientRepository;
  let mapper: OAuthApplicationClientMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OAuthFindApplicationClientByIdQueryHandler,
        {
          provide: OAuthIApplicationClientRepository,
          useClass: OAuthMockApplicationClientRepository,
        },
        {
          provide: OAuthFindApplicationClientByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<OAuthFindApplicationClientByIdQueryHandler>(
      OAuthFindApplicationClientByIdQueryHandler,
    );
    service = module.get<OAuthFindApplicationClientByIdService>(
      OAuthFindApplicationClientByIdService,
    );
    repository = <OAuthMockApplicationClientRepository>(
      module.get<OAuthIApplicationClientRepository>(
        OAuthIApplicationClientRepository,
      )
    );
    mapper = new OAuthApplicationClientMapper();
  });

  describe('main', () => {
    test('FindApplicationClientByIdQueryHandler should be defined', () => {
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
        await queryHandler.execute(
          new OAuthFindApplicationClientByIdQuery(
            oAuthMockApplicationClientData[0].id,
          ),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
