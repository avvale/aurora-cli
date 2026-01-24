import {
  IamFindTenantByIdQuery,
  IamITenantRepository,
  iamMockTenantData,
  IamMockTenantRepository,
  IamTenantMapper,
} from '@app/iam/tenant';
import { IamFindTenantByIdQueryHandler } from '@app/iam/tenant/application/find/iam-find-tenant-by-id.query-handler';
import { IamFindTenantByIdService } from '@app/iam/tenant/application/find/iam-find-tenant-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantByIdQueryHandler', () => {
  let queryHandler: IamFindTenantByIdQueryHandler;
  let service: IamFindTenantByIdService;
  let repository: IamMockTenantRepository;
  let mapper: IamTenantMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamFindTenantByIdQueryHandler,
        {
          provide: IamITenantRepository,
          useClass: IamMockTenantRepository,
        },
        {
          provide: IamFindTenantByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamFindTenantByIdQueryHandler>(
      IamFindTenantByIdQueryHandler,
    );
    service = module.get<IamFindTenantByIdService>(IamFindTenantByIdService);
    repository = <IamMockTenantRepository>(
      module.get<IamITenantRepository>(IamITenantRepository)
    );
    mapper = new IamTenantMapper();
  });

  describe('main', () => {
    test('FindTenantByIdQueryHandler should be defined', () => {
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
        await queryHandler.execute(
          new IamFindTenantByIdQuery(iamMockTenantData[0].id),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
