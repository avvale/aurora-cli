/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateRoleByIdResolver } from './iam-update-role-by-id.resolver';
import { IamUpdateRoleByIdHandler } from '../handlers/iam-update-role-by-id.handler';
import { IamUpdateRoleByIdInput } from '@api/graphql';

// sources
import { roles } from '@app/iam/role/infrastructure/seeds/role.seed';

describe('IamUpdateRoleByIdResolver', () =>
{
    let resolver: IamUpdateRoleByIdResolver;
    let handler: IamUpdateRoleByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateRoleByIdResolver,
                {
                    provide : IamUpdateRoleByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdateRoleByIdResolver>(IamUpdateRoleByIdResolver);
        handler = module.get<IamUpdateRoleByIdHandler>(IamUpdateRoleByIdHandler);
    });

    test('IamUpdateRoleByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateRoleByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a role by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await resolver.main(<IamUpdateRoleByIdInput>roles[0])).toBe(roles[0]);
        });
    });
});