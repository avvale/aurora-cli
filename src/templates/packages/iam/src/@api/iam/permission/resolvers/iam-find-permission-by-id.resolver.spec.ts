/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindPermissionByIdResolver } from './iam-find-permission-by-id.resolver';
import { IamFindPermissionByIdHandler } from '../handlers/iam-find-permission-by-id.handler';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamFindPermissionByIdResolver', () =>
{
    let resolver: IamFindPermissionByIdResolver;
    let handler: IamFindPermissionByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindPermissionByIdResolver,
                {
                    provide : IamFindPermissionByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindPermissionByIdResolver>(IamFindPermissionByIdResolver);
        handler = module.get<IamFindPermissionByIdHandler>(IamFindPermissionByIdHandler);
    });

    test('IamFindPermissionByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindPermissionByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an permission by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await resolver.main(permissions[0].id)).toBe(permissions[0]);
        });
    });
});