/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdatePermissionByIdInput } from '@api/graphql';
import { IamUpsertPermissionHandler, IamUpsertPermissionResolver } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionData[0])));
            expect(await resolver.main(<IamUpdatePermissionByIdInput>iamMockPermissionData[0])).toBe(iamMockPermissionData[0]);
        });
    });
});
