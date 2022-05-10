/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdatePermissionsResolver } from './iam-update-permissions.resolver';
import { IamUpdatePermissionsHandler } from '../handlers/iam-update-permissions.handler';
import { IamUpdatePermissionsInput } from '../../../../graphql';

// sources
import { permissions } from '@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamUpdatePermissionsResolver', () =>
{
    let resolver: IamUpdatePermissionsResolver;
    let handler: IamUpdatePermissionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdatePermissionsResolver,
                {
                    provide : IamUpdatePermissionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdatePermissionsResolver>(IamUpdatePermissionsResolver);
        handler = module.get<IamUpdatePermissionsHandler>(IamUpdatePermissionsHandler);
    });

    test('IamUpdatePermissionsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdatePermissionsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a permissions updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await resolver.main(<IamUpdatePermissionsInput>permissions[0])).toBe(permissions[0]);
        });
    });
});