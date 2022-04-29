/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdatePermissionResolver } from './iam-update-permission.resolver';
import { IamUpdatePermissionHandler } from '../handlers/iam-update-permission.handler';
import { IamUpdatePermissionInput } from '../../../../graphql';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamUpdatePermissionResolver', () =>
{
    let resolver: IamUpdatePermissionResolver;
    let handler: IamUpdatePermissionHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdatePermissionResolver,
                {
                    provide : IamUpdatePermissionHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamUpdatePermissionResolver>(IamUpdatePermissionResolver);
        handler = module.get<IamUpdatePermissionHandler>(IamUpdatePermissionHandler);
    });

    test('IamUpdatePermissionResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdatePermissionResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a permission created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await resolver.main(<IamUpdatePermissionInput>permissions[0])).toBe(permissions[0]);
        });
    });
});