/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreatePermissionResolver } from './iam-create-permission.resolver';
import { IamCreatePermissionHandler } from '../handlers/iam-create-permission.handler';
import { IamCreatePermissionInput } from '../../../../graphql';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamCreatePermissionResolver', () =>
{
    let resolver: IamCreatePermissionResolver;
    let handler: IamCreatePermissionHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamCreatePermissionResolver,
                {
                    provide : IamCreatePermissionHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreatePermissionResolver>(IamCreatePermissionResolver);
        handler = module.get<IamCreatePermissionHandler>(IamCreatePermissionHandler);
    });

    test('IamCreatePermissionResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreatePermissionResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an permission created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await resolver.main(<IamCreatePermissionInput>permissions[0])).toBe(permissions[0]);
        });
    });
});