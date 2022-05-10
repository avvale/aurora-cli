/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdatePermissionByIdResolver } from './iam-update-permission-by-id.resolver';
import { IamUpdatePermissionByIdHandler } from '../handlers/iam-update-permission-by-id.handler';
import { IamUpdatePermissionByIdInput } from '../../../../graphql';

// sources
import { permissions } from '@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamUpdatePermissionByIdResolver', () =>
{
    let resolver: IamUpdatePermissionByIdResolver;
    let handler: IamUpdatePermissionByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdatePermissionByIdResolver,
                {
                    provide : IamUpdatePermissionByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdatePermissionByIdResolver>(IamUpdatePermissionByIdResolver);
        handler = module.get<IamUpdatePermissionByIdHandler>(IamUpdatePermissionByIdHandler);
    });

    test('IamUpdatePermissionByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdatePermissionByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a permission by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await resolver.main(<IamUpdatePermissionByIdInput>permissions[0])).toBe(permissions[0]);
        });
    });
});