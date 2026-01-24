import {
  IamGetTenantsQuery,
  IamITenantRepository,
  IamMockTenantRepository,
  IamTenantMapper,
} from '@app/iam/tenant';
import { IamGetTenantsQueryHandler } from '@app/iam/tenant/application/get/iam-get-tenants.query-handler';
import { IamGetTenantsService } from '@app/iam/tenant/application/get/iam-get-tenants.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetTenantsQueryHandler', () => {
  let queryHandler: IamGetTenantsQueryHandler;
  let service: IamGetTenantsService;
  let repository: IamMockTenantRepository;
  let mapper: IamTenantMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamGetTenantsQueryHandler,
        {
          provide: IamITenantRepository,
          useClass: IamMockTenantRepository,
        },
        {
          provide: IamGetTenantsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamGetTenantsQueryHandler>(
      IamGetTenantsQueryHandler,
    );
    service = module.get<IamGetTenantsService>(IamGetTenantsService);
    repository = <IamMockTenantRepository>(
      module.get<IamITenantRepository>(IamITenantRepository)
    );
    mapper = new IamTenantMapper();
  });

  describe('main', () => {
    test('IamGetTenantsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an tenants founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(new IamGetTenantsQuery()),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});
