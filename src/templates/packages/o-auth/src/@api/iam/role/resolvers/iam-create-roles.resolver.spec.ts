import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateRolesResolver } from './iam-create-roles.resolver';
import { IamCreateRolesHandler } from '../handlers/iam-create-roles.handler';
import { IamCreateRoleInput } from '../../../../graphql';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamCreateRolesResolver', () =>
{
    let resolver: IamCreateRolesResolver;
    let handler: IamCreateRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateRolesResolver,
                {
                    provide : IamCreateRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreateRolesResolver>(IamCreateRolesResolver);
        handler = module.get<IamCreateRolesHandler>(IamCreateRolesHandler);
    });

    test('IamCreateRolesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateRolesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an roles created', async () =>
        {
            expect(await resolver.main(<IamCreateRoleInput[]>roles)).toBe(undefined);
        });
    });
});