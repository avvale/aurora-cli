import {
  IamFindRoleAccountQuery,
  IamIRoleAccountRepository,
  IamMockRoleAccountRepository,
  IamRoleAccountMapper,
} from '@app/iam/role-account';
import { IamFindRoleAccountQueryHandler } from '@app/iam/role-account/application/find/iam-find-role-account.query-handler';
import { IamFindRoleAccountService } from '@app/iam/role-account/application/find/iam-find-role-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleAccountQueryHandler', () => {
  let queryHandler: IamFindRoleAccountQueryHandler;
  let service: IamFindRoleAccountService;
  let repository: IamMockRoleAccountRepository;
  let mapper: IamRoleAccountMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamFindRoleAccountQueryHandler,
        {
          provide: IamIRoleAccountRepository,
          useClass: IamMockRoleAccountRepository,
        },
        {
          provide: IamFindRoleAccountService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamFindRoleAccountQueryHandler>(
      IamFindRoleAccountQueryHandler,
    );
    service = module.get<IamFindRoleAccountService>(IamFindRoleAccountService);
    repository = <IamMockRoleAccountRepository>(
      module.get<IamIRoleAccountRepository>(IamIRoleAccountRepository)
    );
    mapper = new IamRoleAccountMapper();
  });

  describe('main', () => {
    test('IamFindRoleAccountQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an roleAccount founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(new IamFindRoleAccountQuery()),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
