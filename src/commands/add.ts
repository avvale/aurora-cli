import { Command, Flags } from '@oclif/core';
import { ArrayLiteralExpression } from 'ts-morph';
import { BackHandler, FrontHandler, Installer, Prompter, Scope } from '../@cliter';
import { CommonDriver, DecoratorDriver, ImportDriver, ObjectDriver } from '../@cliter/utils/code-writer';

export default class Add extends Command
{
    static description = 'Add a aurora package';

    static flags =
    {
        help : Flags.help({ char: 'h' }),
        force: Flags.boolean({
            char       : 'f',
            description: 'Overwrite existing files.',
        }),
    };

    static args = [
        {
            name       : 'scope',
            required   : true,
            description: 'Scope where our command will act.',
            options    : [
                Scope.BACK,
                Scope.FRONT,
            ],
        },
    ];

    static examples = [
        '$ aurora add back auditing',
        '$ aurora add back auditing -f',
        '$ aurora --help',
    ];

    public async run(): Promise<void>
    {
        const { args, flags } = await this.parse(Add);

        const { packageName }: any = await Prompter.promptAddPackage(args.scope);

        // define state like a generate command
        const addCommandState = {
            command: this,
            flags,
            packageName,
        };

        if (args.scope === Scope.BACK)
        {
            await BackHandler.addPackage(addCommandState);

            switch (packageName)
            {
                case 'auditing': {
                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const sourceFile = CommonDriver.createSourceFile(project, ['src', 'app.module.ts']);
                    Installer.declareBackPackageModule(sourceFile, 'auditing', ['AuditingModule']);
                    sourceFile.saveSync();
                    break;
                }

                case 'iam': {
                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const sourceFile = CommonDriver.createSourceFile(project, ['src', 'app.module.ts']);
                    Installer.declareBackPackageModule(sourceFile, 'iam', ['IamModule']);

                    Installer.changeDecoratorPropertyAdapter(
                        sourceFile,
                        'AppModule',
                        'providers',
                        'AuthorizationGuard',
                        'AuthorizationPermissionsGuard',
                        '@api/iam/shared/guards/authorization-permissions.guard',
                        'Module',
                    );

                    sourceFile.saveSync();
                    break;
                }

                case 'oAuth': {
                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const appModuleSourceFile = CommonDriver.createSourceFile(project, ['src', 'app.module.ts']);
                    Installer.declareBackPackageModule(appModuleSourceFile, 'o-auth', ['OAuthModule']);

                    Installer.changeDecoratorPropertyAdapter(
                        appModuleSourceFile,
                        'AppModule',
                        'providers',
                        'AuthenticationGuard',
                        'AuthenticationJwtGuard',
                        '@api/o-auth/shared/guards/authentication-jwt.guard',
                        'Module',
                    );
                    appModuleSourceFile.saveSync();

                    const sharedModuleSourceFile = CommonDriver.createSourceFile(project, ['src', '@aurora', 'shared.module.ts']);

                    // add custom imports
                    if (ImportDriver.hasImportDeclarations(sharedModuleSourceFile, 'AuthJwtStrategyRegistryModule')) break;

                    ImportDriver.createImportItems(
                        sharedModuleSourceFile,
                        '@app/o-auth/shared/modules/auth-jwt-strategy-registry.module',
                        ['AuthJwtStrategyRegistryModule'],
                    );

                    ImportDriver.createImportItems(
                        sharedModuleSourceFile,
                        '@app/o-auth/shared/jwt-config',
                        ['jwtConfig'],
                    );

                    const classDecoratorArguments = DecoratorDriver.getClassDecoratorArguments(sharedModuleSourceFile, 'SharedModule', 'Module');
                    const importsArray = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(classDecoratorArguments, 'imports');
                    importsArray.addElement('AuthJwtStrategyRegistryModule.forRoot(jwtConfig)', { useNewLines: true });
                    const exportsArray = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(classDecoratorArguments, 'exports');
                    exportsArray.addElement('AuthJwtStrategyRegistryModule', { useNewLines: true });

                    sharedModuleSourceFile.saveSync();

                    break;
                }
            }
        }

        if (args.scope === Scope.FRONT)
        {
            await FrontHandler.addPackage(addCommandState);

            switch (packageName)
            {
                case 'auditing': {
                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const navigationSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'modules', 'admin', 'admin.navigation.ts']);
                    Installer.declareFrontNavigationMenu(navigationSourceFile, 'auditing', 'auditingNavigation');
                    navigationSourceFile.saveSync();

                    const routingSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.routing.ts']);
                    Installer.declareFrontRouting(routingSourceFile, 'auditing');
                    routingSourceFile.saveSync();
                    break;
                }

                case 'iam': {
                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const navigationSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'modules', 'admin', 'admin.navigation.ts']);
                    Installer.declareFrontNavigationMenu(navigationSourceFile, 'iam', 'auditingNavigation');
                    navigationSourceFile.saveSync();

                    const routingSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.routing.ts']);
                    Installer.declareFrontRouting(routingSourceFile, 'iam');
                    routingSourceFile.saveSync();
                    break;
                }

                case 'oAuth': {
                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const navigationSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'modules', 'admin', 'admin.navigation.ts']);
                    Installer.declareFrontNavigationMenu(navigationSourceFile, 'oAuth', 'auditingNavigation');
                    navigationSourceFile.saveSync();

                    const routingSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.routing.ts']);
                    Installer.declareFrontRouting(routingSourceFile, 'oAuth');
                    routingSourceFile.saveSync();
                    break;
                }
            }
        }
    }
}
