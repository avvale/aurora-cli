/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindPermissionResolver } from './iam-find-permission.resolver';
import { IamFindPermissionHandler } from '../handlers/iam-find-permission.handler';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamFindPermissionResolver', () =>
{
    let resolver: IamFindPermissionResolver;
    let handler: IamFindPermissionHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindPermissionResolver,
                {
                    provide : IamFindPermissionHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindPermissionResolver>(IamFindPermissionResolver);
        handler = module.get<IamFindPermissionHandler>(IamFindPermissionHandler);
    });

    test('IamFindPermissionResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindPermissionResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a permission', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await resolver.main()).toBe(permissions[0]);
        });
    });
});