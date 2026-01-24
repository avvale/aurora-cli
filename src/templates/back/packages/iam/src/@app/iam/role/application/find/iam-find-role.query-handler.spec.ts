import {
  IamFindRoleQuery,
  IamIRoleRepository,
  IamMockRoleRepository,
  IamRoleMapper,
} from '@app/iam/role';
import { IamFindRoleQueryHandler } from '@app/iam/role/application/find/iam-find-role.query-handler';
import { IamFindRoleService } from '@app/iam/role/application/find/iam-find-role.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleQueryHandler', () => {
  let queryHandler: IamFindRoleQueryHandler;
  let service: IamFindRoleService;
  let repository: IamMockRoleRepository;
  let mapper: IamRoleMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamFindRoleQueryHandler,
        {
          provide: IamIRoleRepository,
          useClass: IamMockRoleRepository,
        },
        {
          provide: IamFindRoleService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamFindRoleQueryHandler>(IamFindRoleQueryHandler);
    service = module.get<IamFindRoleService>(IamFindRoleService);
    repository = <IamMockRoleRepository>(
      module.get<IamIRoleRepository>(IamIRoleRepository)
    );
    mapper = new IamRoleMapper();
  });

  describe('main', () => {
    test('IamFindRoleQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an role founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(await queryHandler.execute(new IamFindRoleQuery())).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
