import {
  IamCountUserQuery,
  IamIUserRepository,
  IamMockUserRepository,
} from '@app/iam/user';
import { IamCountUserQueryHandler } from '@app/iam/user/application/count/iam-count-user.query-handler';
import { IamCountUserService } from '@app/iam/user/application/count/iam-count-user.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountUserQueryHandler', () => {
  let queryHandler: IamCountUserQueryHandler;
  let service: IamCountUserService;
  let repository: IamMockUserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamCountUserQueryHandler,
        {
          provide: IamIUserRepository,
          useClass: IamMockUserRepository,
        },
        {
          provide: IamCountUserService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamCountUserQueryHandler>(
      IamCountUserQueryHandler,
    );
    service = module.get<IamCountUserService>(IamCountUserService);
    repository = <IamMockUserRepository>(
      module.get<IamIUserRepository>(IamIUserRepository)
    );
  });

  describe('main', () => {
    test('IamCountUserQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should count total inboxes', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(repository.collectionSource.length),
            ),
        );
      expect(await queryHandler.execute(new IamCountUserQuery())).toStrictEqual(
        repository.collectionSource.length,
      );
    });
  });
});
