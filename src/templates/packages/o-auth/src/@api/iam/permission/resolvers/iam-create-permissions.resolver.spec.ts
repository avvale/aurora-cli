import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreatePermissionsResolver } from './iam-create-permissions.resolver';
import { IamCreatePermissionsHandler } from '../handlers/iam-create-permissions.handler';
import { IamCreatePermissionInput } from '../../../../graphql';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamCreatePermissionsResolver', () =>
{
    let resolver: IamCreatePermissionsResolver;
    let handler: IamCreatePermissionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreatePermissionsResolver,
                {
                    provide : IamCreatePermissionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreatePermissionsResolver>(IamCreatePermissionsResolver);
        handler = module.get<IamCreatePermissionsHandler>(IamCreatePermissionsHandler);
    });

    test('IamCreatePermissionsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreatePermissionsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an permissions created', async () =>
        {
            expect(await resolver.main(<IamCreatePermissionInput[]>permissions)).toBe(undefined);
        });
    });
});