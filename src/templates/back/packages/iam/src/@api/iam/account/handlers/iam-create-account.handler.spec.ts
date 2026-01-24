/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreateAccountHandler } from '@api/iam/account';
import { IamFindAccountByIdQuery, iamMockAccountData } from '@app/iam/account';
import { IamGetRolesQuery } from '@app/iam/role';
import { OAuthFindClientByIdQuery } from '@app/o-auth/client';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateAccountHandler', () => {
  let handler: IamCreateAccountHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: '1234567890',
        }),
      ],
      providers: [
        IamCreateAccountHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<IamCreateAccountHandler>(IamCreateAccountHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('IamCreateAccountHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an account created', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation((query) => {
        return new Promise((resolve) => {
          if (query instanceof OAuthFindClientByIdQuery) resolve(clients[0]); // return client
          if (query instanceof IamGetRolesQuery) resolve(roles); // return roles
          if (query instanceof IamFindAccountByIdQuery)
            resolve(iamMockAccountData[0]); // return account created

          resolve(false);
        });
      });

      expect(
        await handler.main(iamMockAccountData[0], {
          // mock jwt
          // eslint-disable-next-line max-len
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImppdCI6IjE1MjQifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.oDME4U1e7-hco5Nyx2pUlO53jcm7x3zakYHWpnHUHzI',
        }),
      ).toBe(iamMockAccountData[0]);
    });
  });
});
