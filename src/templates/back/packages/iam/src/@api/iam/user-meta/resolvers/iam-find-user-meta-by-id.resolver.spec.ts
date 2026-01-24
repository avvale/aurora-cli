/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindUserMetaByIdHandler } from '../handlers/iam-find-user-meta-by-id.handler';
import { IamFindUserMetaByIdResolver } from './iam-find-user-meta-by-id.resolver';

// sources
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';

describe('IamFindUserMetaByIdResolver', () => {
  let resolver: IamFindUserMetaByIdResolver;
  let handler: IamFindUserMetaByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamFindUserMetaByIdResolver,
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

    resolver = module.get<IamFindUserMetaByIdResolver>(
      IamFindUserMetaByIdResolver,
    );
    handler = module.get<IamFindUserMetaByIdHandler>(
      IamFindUserMetaByIdHandler,
    );
  });

  test('IamFindUserMetaByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('IamFindUserByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an user by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(() => new Promise((resolve) => resolve(users[0])));
      expect(await resolver.main(users[0].id)).toBe(users[0]);
    });
  });
});
