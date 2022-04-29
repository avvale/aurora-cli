/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateRoleResolver } from './iam-update-role.resolver';
import { IamUpdateRoleHandler } from '../handlers/iam-update-role.handler';
import { IamUpdateRoleInput } from '../../../../graphql';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamUpdateRoleResolver', () =>
{
    let resolver: IamUpdateRoleResolver;
    let handler: IamUpdateRoleHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateRoleResolver,
                {
                    provide : IamUpdateRoleHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamUpdateRoleResolver>(IamUpdateRoleResolver);
        handler = module.get<IamUpdateRoleHandler>(IamUpdateRoleHandler);
    });

    test('IamUpdateRoleResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateRoleResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a role created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await resolver.main(<IamUpdateRoleInput>roles[0])).toBe(roles[0]);
        });
    });
});