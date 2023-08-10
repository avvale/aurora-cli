/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateRoleByIdInput } from '@api/graphql';
import { IamUpsertRoleHandler, IamUpsertRoleResolver } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertRoleResolver', () =>
{
    let resolver: IamUpsertRoleResolver;
    let handler: IamUpsertRoleHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertRoleResolver,
                {
                    provide : IamUpsertRoleHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpsertRoleResolver>(IamUpsertRoleResolver);
        handler = module.get<IamUpsertRoleHandler>(IamUpsertRoleHandler);
    });

    test('IamUpsertRoleResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpsertRoleResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an role upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleData[0])));
            expect(await resolver.main(<IamUpdateRoleByIdInput>iamMockRoleData[0])).toBe(iamMockRoleData[0]);
        });
    });
});
