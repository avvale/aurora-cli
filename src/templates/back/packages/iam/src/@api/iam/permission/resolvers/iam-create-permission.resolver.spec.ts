/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreatePermissionInput } from '@api/graphql';
import { IamCreatePermissionHandler, IamCreatePermissionResolver } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

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
        })
            .compile();

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionData[0])));
            expect(await resolver.main(<IamCreatePermissionInput>iamMockPermissionData[0])).toBe(iamMockPermissionData[0]);
        });
    });
});
