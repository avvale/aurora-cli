import { Args, Command, Flags, ux } from '@oclif/core';
import { ArrayLiteralExpression, SyntaxKind, Writers } from 'ts-morph';
import { BackHandler, FrontHandler, Installer, Prompter, Scope } from '../@cliter';
import { exec } from '../@cliter/functions/common';
import { CallExpressionDriver, CommonDriver, DecoratorDriver, ImportDriver, ObjectDriver, VariableDriver } from '../@cliter/utils/code-writer';

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
            switch (packageName)
            {
                case 'auditing': {
                    await BackHandler.addPackage(addCommandState);

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

                    DecoratorDriver.changeModuleDecoratorPropertyAdapter(
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

                case 'azureAd': {
                    await BackHandler.addPackage(addCommandState);

                    ux.action.start('Installing dependencies');
                    await exec('npm', ['install', '@nestjs/passport', 'passport-azure-ad']);
                    ux.action.stop('Completed.');

                    const project = CommonDriver.createProject(['tsconfig.json']);

                    // app.module.ts file
                    const appModuleSourceFile = CommonDriver.createSourceFile(project, ['src', 'app.module.ts']);
                    Installer.declareBackPackageModule(
                        appModuleSourceFile,
                        'azure-ad',
                        ['AzureAdModule'],
                    );

                    appModuleSourceFile.saveSync();

                    // auth.decorator.ts file, change Auth decorator
                    const authDecoratorSourceFile = CommonDriver.createSourceFile(project, ['src', '@aurora', 'decorators', 'auth.decorator.ts']);
                    ImportDriver.createImportItems(
                        authDecoratorSourceFile,
                        '@api/azure-ad/azure-ad.guard',
                        ['AzureADGuard'],
                    );

                    const callExpression = CallExpressionDriver.findCallExpression(authDecoratorSourceFile, 'UseGuards');
                    if (callExpression)
                    {
                        CallExpressionDriver.removeAllArguments(callExpression);
                        CallExpressionDriver.addArgument(callExpression, 'AzureADGuard');
                    }

                    authDecoratorSourceFile.saveSync();
                    break;
                }

                case 'iam': {
                    await BackHandler.addPackage(addCommandState);

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
                    await BackHandler.addPackage(addCommandState);

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

                case 'azureAd': {
                    ux.action.start('Installing dependencies');
                    await exec('npm', ['install', '@azure/msal-angular', '@azure/msal-browser']);
                    ux.action.stop('Completed.');

                    await FrontHandler.addPackage(addCommandState);

                    const project = CommonDriver.createProject(['tsconfig.json']);

                    // app.module.ts
                    const appModuleSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.module.ts']);

                    // import AzureAdModule
                    ImportDriver.createImportItems(
                        appModuleSourceFile,
                        './modules/azure-ad/azure-ad.module',
                        ['AzureAdModule'],
                    );
                    DecoratorDriver.addModuleDecoratorProperty(
                        appModuleSourceFile,
                        'AppModule',
                        'NgModule',
                        'imports',
                        'AzureAdModule,',
                    );

                    // implement MsalGuard adapter
                    ImportDriver.createImportItems(
                        appModuleSourceFile,
                        '@azure/msal-angular',
                        ['MsalGuard'],
                    );
                    DecoratorDriver.addModuleDecoratorProperty(
                        appModuleSourceFile,
                        'AppModule',
                        'NgModule',
                        'providers',
                        `
{
    provide    : AuthGuard,
    useExisting: MsalGuard,
},`,
                    );

                    // implement AuthenticationAzureAdAdapterService adapter
                    ImportDriver.createImportItems(
                        appModuleSourceFile,
                        './modules/azure-ad/authentication-azure-ad-adapter.service',
                        ['AuthenticationAzureAdAdapterService'],
                    );
                    DecoratorDriver.changeModuleDecoratorPropertyAdapter(
                        appModuleSourceFile,
                        'AppModule',
                        'NgModule',
                        'providers',
                        'AuthenticationService',
                        'AuthenticationAzureAdAdapterService',
                    );

                    // implement AuthorizationAzureAdAdapterService adapter
                    ImportDriver.createImportItems(
                        appModuleSourceFile,
                        './modules/azure-ad/authorization-azure-ad-adapter.service',
                        ['AuthorizationAzureAdAdapterService'],
                    );
                    DecoratorDriver.addModuleDecoratorProperty(
                        appModuleSourceFile,
                        'AppModule',
                        'NgModule',
                        'providers',
                        `
{
    provide    : AuthorizationService,
    useExisting: AuthorizationAzureAdAdapterService,
},`,
                    );

                    // implement IamAzureAdAdapterService adapter
                    ImportDriver.createImportItems(
                        appModuleSourceFile,
                        './modules/azure-ad/iam-azure-ad-adapter.service',
                        ['IamAzureAdAdapterService'],
                    );
                    DecoratorDriver.changeModuleDecoratorPropertyAdapter(
                        appModuleSourceFile,
                        'AppModule',
                        'NgModule',
                        'providers',
                        'IamService',
                        'IamAzureAdAdapterService',
                    );

                    appModuleSourceFile.organizeImports();
                    appModuleSourceFile.saveSync();

                    // implement environments azure ad variables
                    const environmentFile = CommonDriver.createSourceFile(project, ['src', 'environments', 'environment.ts']);
                    const environmentVariable = VariableDriver.getVariable(environmentFile, 'environment');
                    const environmentObject = environmentVariable?.getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
                    environmentObject?.addPropertyAssignment({
                        name       : 'azureAd',
                        initializer: Writers.object({
                            tenant     : '\'\'',
                            authority  : '\'\'',
                            clientId   : '\'\'',
                            redirectUri: '\'\'',
                            scopes     : '[]',
                        }),
                    });
                    environmentFile.saveSync();

                    // implement environments azure ad variables
                    const environmentProdFile = CommonDriver.createSourceFile(project, ['src', 'environments', 'environment.prod.ts']);
                    const environmentProdVariable = VariableDriver.getVariable(environmentProdFile, 'environment');
                    const environmentProdObject = environmentProdVariable?.getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
                    environmentProdObject?.addPropertyAssignment({
                        name       : 'azureAd',
                        initializer: Writers.object({
                            tenant     : '\'\'',
                            authority  : '\'\'',
                            clientId   : '\'\'',
                            redirectUri: '\'\'',
                            scopes     : '[]',
                        }),
                    });
                    environmentProdFile.saveSync();

                    // implement environments azure ad variables
                    const environmentLocalFile = CommonDriver.createSourceFile(project, ['src', 'environments', 'environment.local.ts']);
                    const environmentLocalVariable = VariableDriver.getVariable(environmentLocalFile, 'environment');
                    const environmentLocalObject = environmentLocalVariable?.getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
                    environmentLocalObject?.addPropertyAssignment({
                        name       : 'azureAd',
                        initializer: Writers.object({
                            tenant     : '\'\'',
                            authority  : '\'\'',
                            clientId   : '\'\'',
                            redirectUri: '\'\'',
                            scopes     : '[]',
                        }),
                    });
                    environmentLocalFile.saveSync();

                    // implement environments azure ad variables
                    const environmentDevFile = CommonDriver.createSourceFile(project, ['src', 'environments', 'environment.dev.ts']);
                    const environmentDevVariable = VariableDriver.getVariable(environmentDevFile, 'environment');
                    const environmentDevObject = environmentDevVariable?.getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
                    environmentDevObject?.addPropertyAssignment({
                        name       : 'azureAd',
                        initializer: Writers.object({
                            tenant     : '\'\'',
                            authority  : '\'\'',
                            clientId   : '\'\'',
                            redirectUri: '\'\'',
                            scopes     : '[]',
                        }),
                    });
                    environmentDevFile.saveSync();

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

                    DecoratorDriver.changeModuleDecoratorPropertyAdapter(
                        appModuleSourceFile,
                        'AppModule',
                        'NgModule',
                        'providers',
                        'UserMetaStorageService',
                        'UserMetaStorageIamAdapterService',
                    );

                    DecoratorDriver.changeModuleDecoratorPropertyAdapter(
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

                    // app.module.ts
                    const appModuleSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.module.ts']);

                    DecoratorDriver.changeModuleDecoratorPropertyAdapter(
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
