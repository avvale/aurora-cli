import {
  IamFindUserQuery,
  IamIUserRepository,
  IamMockUserRepository,
  IamUserMapper,
} from '@app/iam/user';
import { IamFindUserQueryHandler } from '@app/iam/user/application/find/iam-find-user.query-handler';
import { IamFindUserService } from '@app/iam/user/application/find/iam-find-user.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindUserQueryHandler', () => {
  let queryHandler: IamFindUserQueryHandler;
  let service: IamFindUserService;
  let repository: IamMockUserRepository;
  let mapper: IamUserMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamFindUserQueryHandler,
        {
          provide: IamIUserRepository,
          useClass: IamMockUserRepository,
        },
        {
          provide: IamFindUserService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamFindUserQueryHandler>(IamFindUserQueryHandler);
    service = module.get<IamFindUserService>(IamFindUserService);
    repository = <IamMockUserRepository>(
      module.get<IamIUserRepository>(IamIUserRepository)
    );
    mapper = new IamUserMapper();
  });

  describe('main', () => {
    test('IamFindUserQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an user founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(await queryHandler.execute(new IamFindUserQuery())).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
