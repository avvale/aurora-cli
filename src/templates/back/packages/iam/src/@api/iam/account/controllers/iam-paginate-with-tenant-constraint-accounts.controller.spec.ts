/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { IamPaginateWithTenantConstraintAccountsHandler } from '../handlers/iam-paginate-with-tenant-constraint-accounts.handler';
import { IamPaginateWithTenantConstraintAccountsController } from './iam-paginate-with-tenant-constraint-accounts.controller';

describe('IamPaginateWithTenantConstraintAccountsController', () => {
  let controller: IamPaginateWithTenantConstraintAccountsController;
  let handler: IamPaginateWithTenantConstraintAccountsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamPaginateWithTenantConstraintAccountsController],
      providers: [
        {
          provide: IamPaginateWithTenantConstraintAccountsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamPaginateWithTenantConstraintAccountsController>(
      IamPaginateWithTenantConstraintAccountsController,
    );
    handler = module.get<IamPaginateWithTenantConstraintAccountsHandler>(
      IamPaginateWithTenantConstraintAccountsHandler,
    );
  });

  describe('main', () => {
    test('IamPaginateWithTenantConstraintAccountsController should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
