/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteRolesResolver } from './iam-delete-roles.resolver';
import { IamDeleteRolesHandler } from '../handlers/iam-delete-roles.handler';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamDeleteRolesResolver', () =>
{
    let resolver: IamDeleteRolesResolver;
    let handler: IamDeleteRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteRolesResolver,
                {
                    provide : IamDeleteRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamDeleteRolesResolver>(IamDeleteRolesResolver);
        handler = module.get<IamDeleteRolesHandler>(IamDeleteRolesHandler);
    });

    test('IamDeleteRolesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteRolesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an roles deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles)));
            expect(await resolver.main()).toBe(roles);
        });
    });
});