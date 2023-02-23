/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpsertPermissionResolver } from './iam-upsert-permission.resolver';
import { IamUpsertPermissionHandler } from '../handlers/iam-upsert-permission.handler';
import { IamUpdatePermissionByIdInput } from '@api/graphql';

// sources
import { permissions } from '@app/iam/permission/infrastructure/mock/mock-permission.data';

describe('IamUpsertPermissionResolver', () =>
{
    let resolver: IamUpsertPermissionResolver;
    let handler: IamUpsertPermissionHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertPermissionResolver,
                {
                    provide : IamUpsertPermissionHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpsertPermissionResolver>(IamUpsertPermissionResolver);
        handler = module.get<IamUpsertPermissionHandler>(IamUpsertPermissionHandler);
    });

    test('IamUpsertPermissionResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpsertPermissionResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an permission upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await resolver.main(<IamUpdatePermissionByIdInput>permissions[0])).toBe(permissions[0]);
        });
    });
});