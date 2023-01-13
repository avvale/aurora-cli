/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateRolesResolver } from './iam-update-roles.resolver';
import { IamUpdateRolesHandler } from '../handlers/iam-update-roles.handler';
import { IamUpdateRolesInput } from '@api/graphql';

// sources
import { roles } from '@app/iam/role/infrastructure/seeds/role.seed';

describe('IamUpdateRolesResolver', () =>
{
    let resolver: IamUpdateRolesResolver;
    let handler: IamUpdateRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateRolesResolver,
                {
                    provide : IamUpdateRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdateRolesResolver>(IamUpdateRolesResolver);
        handler = module.get<IamUpdateRolesHandler>(IamUpdateRolesHandler);
    });

    test('IamUpdateRolesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateRolesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a roles updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await resolver.main(<IamUpdateRolesInput>roles[0])).toBe(roles[0]);
        });
    });
});