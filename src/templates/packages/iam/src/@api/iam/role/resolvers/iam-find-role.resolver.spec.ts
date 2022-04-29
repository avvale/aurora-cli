/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindRoleResolver } from './iam-find-role.resolver';
import { IamFindRoleHandler } from '../handlers/iam-find-role.handler';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamFindRoleResolver', () =>
{
    let resolver: IamFindRoleResolver;
    let handler: IamFindRoleHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindRoleResolver,
                {
                    provide : IamFindRoleHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindRoleResolver>(IamFindRoleResolver);
        handler = module.get<IamFindRoleHandler>(IamFindRoleHandler);
    });

    test('IamFindRoleResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindRoleResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a role', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await resolver.main()).toBe(roles[0]);
        });
    });
});