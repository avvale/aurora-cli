/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamPaginatePermissionsResolver } from './iam-paginate-permissions.resolver';
import { IamPaginatePermissionsHandler } from '../handlers/iam-paginate-permissions.handler';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamPaginatePermissionsResolver', () =>
{
    let resolver: IamPaginatePermissionsResolver;
    let handler: IamPaginatePermissionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginatePermissionsResolver,
                {
                    provide : IamPaginatePermissionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver    = module.get<IamPaginatePermissionsResolver>(IamPaginatePermissionsResolver);
        handler = module.get<IamPaginatePermissionsHandler>(IamPaginatePermissionsHandler);
    });

    test('IamPaginatePermissionsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginatePermissionsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a permissions', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : permissions,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : permissions,
            });
        });
    });
});