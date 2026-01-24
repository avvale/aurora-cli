/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindUserMetaByIdHandler } from '../handlers/iam-find-user-meta-by-id.handler';
import { IamFindUserMetaByIdController } from './iam-find-user-meta-by-id.controller';

// sources
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';

describe('IamFindUserMetaByIdController', () => {
  let controller: IamFindUserMetaByIdController;
  let handler: IamFindUserMetaByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [IamFindUserMetaByIdController],
      providers: [
        {
          provide: IamFindUserMetaByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<IamFindUserMetaByIdController>(
      IamFindUserMetaByIdController,
    );
    handler = module.get<IamFindUserMetaByIdHandler>(
      IamFindUserMetaByIdHandler,
    );
  });

  describe('main', () => {
    test('IamFindUserMetaByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an user by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(() => new Promise((resolve) => resolve(users[0])));
      expect(await controller.main(users[0].id)).toBe(users[0]);
    });
  });
});
