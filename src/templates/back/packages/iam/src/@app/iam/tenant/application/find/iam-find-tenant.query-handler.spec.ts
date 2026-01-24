import {
  IamFindTenantQuery,
  IamITenantRepository,
  IamMockTenantRepository,
  IamTenantMapper,
} from '@app/iam/tenant';
import { IamFindTenantQueryHandler } from '@app/iam/tenant/application/find/iam-find-tenant.query-handler';
import { IamFindTenantService } from '@app/iam/tenant/application/find/iam-find-tenant.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantQueryHandler', () => {
  let queryHandler: IamFindTenantQueryHandler;
  let service: IamFindTenantService;
  let repository: IamMockTenantRepository;
  let mapper: IamTenantMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamFindTenantQueryHandler,
        {
          provide: IamITenantRepository,
          useClass: IamMockTenantRepository,
        },
        {
          provide: IamFindTenantService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamFindTenantQueryHandler>(
      IamFindTenantQueryHandler,
    );
    service = module.get<IamFindTenantService>(IamFindTenantService);
    repository = <IamMockTenantRepository>(
      module.get<IamITenantRepository>(IamITenantRepository)
    );
    mapper = new IamTenantMapper();
  });

  describe('main', () => {
    test('IamFindTenantQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an tenant founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(new IamFindTenantQuery()),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
