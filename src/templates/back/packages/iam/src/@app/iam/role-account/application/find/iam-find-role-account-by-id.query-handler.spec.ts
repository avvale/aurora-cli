import {
  IamFindRoleAccountByIdQuery,
  IamIRoleAccountRepository,
  iamMockRoleAccountData,
  IamMockRoleAccountRepository,
  IamRoleAccountMapper,
} from '@app/iam/role-account';
import { IamFindRoleAccountByIdQueryHandler } from '@app/iam/role-account/application/find/iam-find-role-account-by-id.query-handler';
import { IamFindRoleAccountByIdService } from '@app/iam/role-account/application/find/iam-find-role-account-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleAccountByIdQueryHandler', () => {
  let queryHandler: IamFindRoleAccountByIdQueryHandler;
  let service: IamFindRoleAccountByIdService;
  let repository: IamMockRoleAccountRepository;
  let mapper: IamRoleAccountMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamFindRoleAccountByIdQueryHandler,
        {
          provide: IamIRoleAccountRepository,
          useClass: IamMockRoleAccountRepository,
        },
        {
          provide: IamFindRoleAccountByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamFindRoleAccountByIdQueryHandler>(
      IamFindRoleAccountByIdQueryHandler,
    );
    service = module.get<IamFindRoleAccountByIdService>(
      IamFindRoleAccountByIdService,
    );
    repository = <IamMockRoleAccountRepository>(
      module.get<IamIRoleAccountRepository>(IamIRoleAccountRepository)
    );
    mapper = new IamRoleAccountMapper();
  });

  describe('main', () => {
    test('FindRoleAccountByIdQueryHandler should be defined', () => {
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
        await queryHandler.execute(
          new IamFindRoleAccountByIdQuery(iamMockRoleAccountData[0].id),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
