/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeletePermissionsResolver } from './iam-delete-permissions.resolver';
import { IamDeletePermissionsHandler } from '../handlers/iam-delete-permissions.handler';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamDeletePermissionsResolver', () =>
{
    let resolver: IamDeletePermissionsResolver;
    let handler: IamDeletePermissionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeletePermissionsResolver,
                {
                    provide : IamDeletePermissionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamDeletePermissionsResolver>(IamDeletePermissionsResolver);
        handler = module.get<IamDeletePermissionsHandler>(IamDeletePermissionsHandler);
    });

    test('IamDeletePermissionsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeletePermissionsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an permissions deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions)));
            expect(await resolver.main()).toBe(permissions);
        });
    });
});