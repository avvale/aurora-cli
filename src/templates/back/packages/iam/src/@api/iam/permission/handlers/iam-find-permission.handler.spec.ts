/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamFindPermissionHandler } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionHandler', () => {
  let handler: IamFindPermissionHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamFindPermissionHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<IamFindPermissionHandler>(IamFindPermissionHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamFindPermissionHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamFindPermissionHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a permission', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockPermissionData[0])),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        iamMockPermissionData[0],
      );
    });
  });
});
