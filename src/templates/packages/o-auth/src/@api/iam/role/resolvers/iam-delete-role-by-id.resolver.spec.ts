/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteRoleByIdResolver } from './iam-delete-role-by-id.resolver';
import { IamDeleteRoleByIdHandler } from '../handlers/iam-delete-role-by-id.handler';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamDeleteRoleByIdResolver', () =>
{
    let resolver: IamDeleteRoleByIdResolver;
    let handler: IamDeleteRoleByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteRoleByIdResolver,
                {
                    provide : IamDeleteRoleByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamDeleteRoleByIdResolver>(IamDeleteRoleByIdResolver);
        handler = module.get<IamDeleteRoleByIdHandler>(IamDeleteRoleByIdHandler);
    });

    test('IamDeleteRoleByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteRoleByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an role deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await resolver.main(roles[0].id)).toBe(roles[0]);
        });
    });
});