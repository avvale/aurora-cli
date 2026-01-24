import {
  IamIRoleRepository,
  IamMockRoleRepository,
  IamPaginateRolesQuery,
} from '@app/iam/role';
import { IamPaginateRolesQueryHandler } from '@app/iam/role/application/paginate/iam-paginate-roles.query-handler';
import { IamPaginateRolesService } from '@app/iam/role/application/paginate/iam-paginate-roles.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateRolesQueryHandler', () => {
  let queryHandler: IamPaginateRolesQueryHandler;
  let service: IamPaginateRolesService;
  let repository: IamMockRoleRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamPaginateRolesQueryHandler,
        {
          provide: IamIRoleRepository,
          useClass: IamMockRoleRepository,
        },
        {
          provide: IamPaginateRolesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamPaginateRolesQueryHandler>(
      IamPaginateRolesQueryHandler,
    );
    service = module.get<IamPaginateRolesService>(IamPaginateRolesService);
    repository = <IamMockRoleRepository>(
      module.get<IamIRoleRepository>(IamIRoleRepository)
    );
  });

  describe('main', () => {
    test('IamPaginateRolesQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an roles paginated', async () => {
      jest.spyOn(service, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              count: 10,
              total: 100,
              rows: repository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await queryHandler.execute(
          new IamPaginateRolesQuery({
            offset: 0,
            limit: 10,
          }),
        ),
      ).toStrictEqual(
        new PaginationResponse(
          100,
          10,
          repository.collectionSource.slice(0, 10).map((item) => item.toDTO()),
        ),
      );
    });
  });
});
