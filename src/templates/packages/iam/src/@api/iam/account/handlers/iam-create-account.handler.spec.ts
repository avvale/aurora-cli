/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { clients, ICommandBus, IQueryBus, OAuthFindClientByIdQuery } from 'aurora-ts-core';

// ---- customizations ----
import { IamCreateAccountHandler } from './iam-create-account.handler';
import { GetRolesQuery } from '../../../../@apps/iam/role/application/get/get-roles.query';
import { FindAccountByIdQuery } from '../../../../@apps/iam/account/application/find/find-account-by-id.query';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamCreateAccountHandler', () =>
{
    let handler: IamCreateAccountHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

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
        }).compile();

        handler     = module.get<IamCreateAccountHandler>(IamCreateAccountHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
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
                    if (query instanceof OAuthFindClientByIdQuery) resolve(clients[0]); // return client
                    if (query instanceof GetRolesQuery) resolve(roles); // return roles
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