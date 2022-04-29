/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetRolesResolver } from './iam-get-roles.resolver';
import { IamGetRolesHandler } from '../handlers/iam-get-roles.handler';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamGetRolesResolver', () =>
{
    let resolver: IamGetRolesResolver;
    let handler: IamGetRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamGetRolesResolver,
                {
                    provide : IamGetRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamGetRolesResolver>(IamGetRolesResolver);
        handler = module.get<IamGetRolesHandler>(IamGetRolesHandler);
    });

    test('IamGetRolesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('IamGetRolesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a roles', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles)));
            expect(await resolver.main()).toBe(roles);
        });
    });
});