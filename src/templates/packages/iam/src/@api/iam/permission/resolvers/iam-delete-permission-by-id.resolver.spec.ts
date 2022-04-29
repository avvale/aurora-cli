/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeletePermissionByIdResolver } from './iam-delete-permission-by-id.resolver';
import { IamDeletePermissionByIdHandler } from '../handlers/iam-delete-permission-by-id.handler';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamDeletePermissionByIdResolver', () =>
{
    let resolver: IamDeletePermissionByIdResolver;
    let handler: IamDeletePermissionByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeletePermissionByIdResolver,
                {
                    provide : IamDeletePermissionByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamDeletePermissionByIdResolver>(IamDeletePermissionByIdResolver);
        handler = module.get<IamDeletePermissionByIdHandler>(IamDeletePermissionByIdHandler);
    });

    test('IamDeletePermissionByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeletePermissionByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an permission deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await resolver.main(permissions[0].id)).toBe(permissions[0]);
        });
    });
});