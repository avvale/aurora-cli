/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetPermissionsResolver } from './iam-get-permissions.resolver';
import { IamGetPermissionsHandler } from '../handlers/iam-get-permissions.handler';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamGetPermissionsResolver', () =>
{
    let resolver: IamGetPermissionsResolver;
    let handler: IamGetPermissionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamGetPermissionsResolver,
                {
                    provide : IamGetPermissionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamGetPermissionsResolver>(IamGetPermissionsResolver);
        handler = module.get<IamGetPermissionsHandler>(IamGetPermissionsHandler);
    });

    test('IamGetPermissionsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('IamGetPermissionsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a permissions', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions)));
            expect(await resolver.main()).toBe(permissions);
        });
    });
});