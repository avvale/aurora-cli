/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreateAccountHandler } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';
import { IamGetRolesQuery } from '@app/iam/role';
import { FindClientByIdQuery } from '@app/o-auth/client/application/find/find-client-by-id.query';
import { FindAccountByIdQuery } from '@app/iam/account';
import { JwtModule } from '@nestjs/jwt';

describe('IamCreateAccountHandler', () =>
{
    let handler: IamCreateAccountHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: '1234567890',
                }),
            ],
            providers: [
                IamCreateAccountHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamCreateAccountHandler>(IamCreateAccountHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('IamCreateAccountHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an account created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(query =>
            {
                return new Promise(resolve =>
                {
                    if (query instanceof FindClientByIdQuery) resolve(clients[0]); // return client
                    if (query instanceof IamGetRolesQuery) resolve(roles); // return roles
                    if (query instanceof FindAccountByIdQuery) resolve(accounts[0]); // return account created

                    resolve(false);
                });
            });

            expect(await handler.main(
                accounts[0],
                {
                    // mock jwt
                    // eslint-disable-next-line max-len
                    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImppdCI6IjE1MjQifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.oDME4U1e7-hco5Nyx2pUlO53jcm7x3zakYHWpnHUHzI',
                },
            )).toBe(accounts[0]);
        });
    });
});
