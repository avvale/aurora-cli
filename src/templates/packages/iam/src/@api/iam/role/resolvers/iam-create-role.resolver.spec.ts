/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateRoleResolver } from './iam-create-role.resolver';
import { IamCreateRoleHandler } from '../handlers/iam-create-role.handler';
import { IamCreateRoleInput } from '../../../../graphql';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamCreateRoleResolver', () =>
{
    let resolver: IamCreateRoleResolver;
    let handler: IamCreateRoleHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamCreateRoleResolver,
                {
                    provide : IamCreateRoleHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreateRoleResolver>(IamCreateRoleResolver);
        handler = module.get<IamCreateRoleHandler>(IamCreateRoleHandler);
    });

    test('IamCreateRoleResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateRoleResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an role created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await resolver.main(<IamCreateRoleInput>roles[0])).toBe(roles[0]);
        });
    });
});