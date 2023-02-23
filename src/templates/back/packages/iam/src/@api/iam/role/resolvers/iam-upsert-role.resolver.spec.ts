/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpsertRoleResolver } from './iam-upsert-role.resolver';
import { IamUpsertRoleHandler } from '../handlers/iam-upsert-role.handler';
import { IamUpsertRoleInput } from '@api/graphql';

// sources
import { roles } from '@app/iam/role/infrastructure/seeds/role.seed';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await resolver.main(<IamUpsertRoleInput>roles[0])).toBe(roles[0]);
        });
    });
});