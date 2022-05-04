/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindRoleByIdResolver } from './iam-find-role-by-id.resolver';
import { IamFindRoleByIdHandler } from '../handlers/iam-find-role-by-id.handler';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamFindRoleByIdResolver', () =>
{
    let resolver: IamFindRoleByIdResolver;
    let handler: IamFindRoleByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindRoleByIdResolver,
                {
                    provide : IamFindRoleByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindRoleByIdResolver>(IamFindRoleByIdResolver);
        handler = module.get<IamFindRoleByIdHandler>(IamFindRoleByIdHandler);
    });

    test('IamFindRoleByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindRoleByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an role by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await resolver.main(roles[0].id)).toBe(roles[0]);
        });
    });
});