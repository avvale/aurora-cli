import { Args, Command, Flags, ux } from '@oclif/core';
import { ArrayLiteralExpression } from 'ts-morph';
import { BackHandler, FrontHandler, Installer, Prompter, Scope } from '../@cliter';
import { exec } from '../@cliter/functions/common';
import { CallExpressionDriver, CommonDriver, DecoratorDriver, ImportDriver, ObjectDriver } from '../@cliter/utils/code-writer';

export class Add extends Command
{
    static description = 'Add a aurora package';

    static flags = {
        help : Flags.help({ char: 'h' }),
        force: Flags.boolean({
            char       : 'f',
            description: 'Overwrite existing files.',
        }),
    };

    static args = {
        firstArg: Args.string({
            name       : 'scope',
            required   : true,
            description: 'Scope where our command will act.',
            options    : [
                Scope.BACK,
                Scope.FRONT,
            ],
        }),
    };

    static examples = [
        '$ aurora add back auditing',
        '$ aurora add back auditing -f',
        '$ aurora --help',
    ];

    async run(): Promise<void>
    {
        const { args, flags } = await this.parse(Add);

        const { packageName }: any = await Prompter.promptAddPackage(args.firstArg);

        // define state like a generate command
        const addCommandState = {
            command: this,
            flags,
            packageName,
        };

        if (args.firstArg === Scope.BACK)
        {
            await BackHandler.addPackage(addCommandState);

            switch (packageName)
            {
                case 'auditing': {
                    ux.action.start('Installing dependencies');
                    await exec('npm', ['install', '@nestjs/axios', '@nestjs/schedule']);
                    await exec('npm', ['install', '-D', '@types/cron']);
                    ux.action.stop('Completed.');

                    const project = CommonDriver.createProject(['tsconfig.json']);

                    // app.module.ts file
                    const appModuleSourceFile = CommonDriver.createSourceFile(project, ['src', 'app.module.ts']);
                    const appModuleClassDecoratorArguments = DecoratorDriver.getClassDecoratorArguments(appModuleSourceFile, 'AppModule', 'Module');
                    Installer.declareBackPackageModule(appModuleSourceFile, 'auditing', ['AuditingModule']);

                    // add ScheduleModule
                    if (!ImportDriver.hasImportDeclarations(appModuleSourceFile, 'ScheduleModule'))
                    {
                        ImportDriver.createImportItems(
                            appModuleSourceFile,
                            '@nestjs/schedule',
                            ['ScheduleModule'],
                        );

                        const importsArray = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(appModuleClassDecoratorArguments, 'imports');
                        importsArray.addElement('ScheduleModule.forRoot()', { useNewLines: true });
                    }

                    appModuleSourceFile.saveSync();

                    // shared.module.ts file
                    const sharedModuleSourceFile = CommonDriver.createSourceFile(project, ['src', '@aurora', 'shared.module.ts']);
                    const classDecoratorArguments = DecoratorDriver.getClassDecoratorArguments(sharedModuleSourceFile, 'SharedModule', 'Module');

                    if (!ImportDriver.hasImportDeclarations(sharedModuleSourceFile, 'HttpModule'))
                    {
                        ImportDriver.createImportItems(
                            sharedModuleSourceFile,
                            '@nestjs/axios',
                            ['HttpModule'],
                        );

                        const importsArray = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(classDecoratorArguments, 'imports');
                        importsArray.addElement('HttpModule', { useNewLines: true });
                    }

                    if (!ImportDriver.hasImportDeclarations(sharedModuleSourceFile, 'AuditingAxiosInterceptorService'))
                    {
                        ImportDriver.createImportItems(
                            sharedModuleSourceFile,
                            '@api/auditing/shared/services/auditing-axios-interceptor.service',
                            ['AuditingAxiosInterceptorService'],
                        );

                        const providersArray = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(classDecoratorArguments, 'providers');
                        providersArray.addElement('AuditingAxiosInterceptorService', { useNewLines: true });
                    }

                    ImportDriver.createImportItems(
                        sharedModuleSourceFile,
                        '@api/auditing/shared/services/auditing-runner-aurora-implementation.service',
                        ['AuditingRunnerAuroraImplementationService'],
                    );

                    DecoratorDriver.changeDecoratorPropertyAdapter(
                        sharedModuleSourceFile,
                        'SharedModule',
                        'Module',
                        'providers',
                        'AuditingRunner',
                        'AuditingRunnerAuroraImplementationService',
                    );

                    sharedModuleSourceFile.saveSync();

                    ux.action.start('Generating graphql types');
                    await exec('npm', ['run', 'graphql:types']);
                    ux.action.stop('Completed.');
                    break;
                }

                case 'iam': {
                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const appModuleSourceFile = CommonDriver.createSourceFile(project, ['src', 'app.module.ts']);
                    Installer.declareBackPackageModule(appModuleSourceFile, 'iam', ['IamModule']);
                    appModuleSourceFile.saveSync();

                    // change auth decorator
                    const authDecoratorSourceFile = CommonDriver.createSourceFile(project, ['src', '@aurora', 'decorators', 'auth.decorator.ts']);
                    ImportDriver.createImportItems(
                        authDecoratorSourceFile,
                        '@api/iam/shared/guards/authorization-permissions.guard',
                        ['AuthorizationPermissionsGuard'],
                    );

                    const callExpression = CallExpressionDriver.findCallExpression(authDecoratorSourceFile, 'UseGuards');
                    if (callExpression)
                    {
                        CallExpressionDriver.replaceArgument(callExpression, 'AuthorizationDisabledAdapterGuard', 'AuthorizationPermissionsGuard');
                    }

                    authDecoratorSourceFile.saveSync();

                    ux.action.start('Generating graphql types');
                    await exec('npm', ['run', 'graphql:types']);
                    ux.action.stop('Completed.');

                    break;
                }

                case 'oAuth': {
                    ux.action.start('Installing dependencies');
                    await exec('npm', ['install', '@nestjs/jwt', '@nestjs/passport', 'passport-jwt']);
                    await exec('npm', ['install', '-D', '@types/passport-jwt']);
                    ux.action.stop('Completed.');

                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const appModuleSourceFile = CommonDriver.createSourceFile(project, ['src', 'app.module.ts']);
                    Installer.declareBackPackageModule(appModuleSourceFile, 'o-auth', ['OAuthModule']);
                    appModuleSourceFile.saveSync();

                    // imports to shared module
                    const sharedModuleSourceFile = CommonDriver.createSourceFile(project, ['src', '@aurora', 'shared.module.ts']);
                    if (!ImportDriver.hasImportDeclarations(sharedModuleSourceFile, 'AuthJwtStrategyRegistryModule'))
                    {
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
                    }

                    sharedModuleSourceFile.saveSync();

                    // change Auth decorator
                    const authDecoratorSourceFile = CommonDriver.createSourceFile(project, ['src', '@aurora', 'decorators', 'auth.decorator.ts']);
                    ImportDriver.createImportItems(
                        authDecoratorSourceFile,
                        '@api/o-auth/shared/guards/authentication-jwt.guard',
                        ['AuthenticationJwtGuard'],
                    );

                    const callExpression = CallExpressionDriver.findCallExpression(authDecoratorSourceFile, 'UseGuards');
                    if (callExpression)
                    {
                        CallExpressionDriver.replaceArgument(callExpression, 'AuthenticationDisabledAdapterGuard', 'AuthenticationJwtGuard');
                    }

                    authDecoratorSourceFile.saveSync();

                    ux.action.start('Generating graphql types');
                    await exec('npm', ['run', 'graphql:types']);
                    ux.action.stop('Completed.');

                    break;
                }
            }
        }

        if (args.firstArg === Scope.FRONT)
        {
            switch (packageName)
            {
                case 'auditing': {
                    await FrontHandler.addPackage(addCommandState);

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
                    await FrontHandler.addPackage(addCommandState);

                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const navigationSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'modules', 'admin', 'admin.navigation.ts']);
                    Installer.declareFrontNavigationMenu(navigationSourceFile, 'iam', 'iamNavigation');
                    navigationSourceFile.saveSync();

                    const routingSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.routing.ts']);
                    Installer.declareFrontRouting(routingSourceFile, 'iam');
                    routingSourceFile.saveSync();

                    // add custom imports
                    const appModuleSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.module.ts']);
                    if (!ImportDriver.hasImportDeclarations(appModuleSourceFile, 'UserMetaStorageIamAdapterService'))
                    {
                        ImportDriver.createImportItems(
                            appModuleSourceFile,
                            './modules/admin/apps/iam/user-meta/user-meta-storage-iam-adapter.service',
                            ['UserMetaStorageIamAdapterService'],
                        );
                    }

                    DecoratorDriver.changeDecoratorPropertyAdapter(
                        appModuleSourceFile,
                        'AppModule',
                        'NgModule',
                        'providers',
                        'UserMetaStorageService',
                        'UserMetaStorageIamAdapterService',
                    );

                    DecoratorDriver.changeDecoratorPropertyAdapter(
                        appModuleSourceFile,
                        'AppModule',
                        'NgModule',
                        'providers',
                        'IamService',
                        'IamAuroraAdapterService',
                    );

                    appModuleSourceFile.saveSync();
                    break;
                }

                case 'oAuth': {
                    await FrontHandler.addPackage(addCommandState);

                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const navigationSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'modules', 'admin', 'admin.navigation.ts']);
                    Installer.declareFrontNavigationMenu(navigationSourceFile, 'oAuth', 'oAuthNavigation');
                    navigationSourceFile.saveSync();

                    const routingSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.routing.ts']);
                    Installer.declareFrontRouting(routingSourceFile, 'oAuth');
                    routingSourceFile.saveSync();

                    // add custom imports
                    const appModuleSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.module.ts']);

                    DecoratorDriver.changeDecoratorPropertyAdapter(
                        appModuleSourceFile,
                        'AppModule',
                        'NgModule',
                        'providers',
                        'AuthenticationService',
                        'AuthenticationAuroraAdapterService',
                    );

                    DecoratorDriver.removeDecoratorAdapter(
                        appModuleSourceFile,
                        'AppModule',
                        'NgModule',
                        'providers',
                        'AuthGuard',
                    );

                    appModuleSourceFile.saveSync();
                    break;
                }

                case 'environments': {
                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const appModuleSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.module.ts']);
                    DecoratorDriver.removeDecoratorAdapter(
                        appModuleSourceFile,
                        'AppModule',
                        'NgModule',
                        'providers',
                        'EnvironmentsInformationService',
                    );

                    appModuleSourceFile.saveSync();
                }
            }
        }
    }
}
