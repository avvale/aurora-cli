/* eslint-disable complexity */
import { Args, Command, Flags, ux } from '@oclif/core';
import * as fs from 'node:fs';
import { ArrayLiteralExpression, ObjectLiteralExpression, Writers } from 'ts-morph';
import { BackHandler, FrontHandler, Installer, Prompter, Scope } from '../@cliter';
import { exec } from '../@cliter/functions/common';
import { ArrayDriver, ArrowFunctionDriver, CallExpressionDriver, CommonDriver, DecoratorDriver, ImportDriver, ObjectDriver, VariableDriver, getInitializer } from '../@cliter/utils/code-writer/public-api';

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
            if (
                !(
                    fs.existsSync('src/@api') &&
                    fs.existsSync('src/@app') &&
                    fs.existsSync('src/@aurora')
                )
            )
            {
                throw new Error('No Aurora back application is detected in the current directory.');
            }

            switch (packageName)
            {
                case 'auditing': {
                    await BackHandler.addPackage(addCommandState);

                    ux.action.start('Installing dependencies');
                    await exec('npm', ['install', '@nestjs/axios', '@nestjs/schedule']);
                    await exec('npm', ['install', '-D', '@types/cron']);
                    ux.action.stop('Completed!');

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
                        // TODO, replace addElement with ArrayDriver.addArrayItems
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
                        // TODO, replace addElement with ArrayDriver.addArrayItems
                        importsArray.addElement('HttpModule', { useNewLines: true });
                    }

                    if (!ImportDriver.hasImportDeclarations(sharedModuleSourceFile, 'AuditingAxiosInterceptorService'))
                    {
                        ImportDriver.createImportItems(
                            sharedModuleSourceFile,
                            '@api/auditing/shared',
                            ['AuditingAxiosInterceptorService'],
                        );

                        const providersArray = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(classDecoratorArguments, 'providers');
                        // TODO, replace addElement with ArrayDriver.addArrayItems
                        providersArray.addElement('AuditingAxiosInterceptorService', { useNewLines: true });
                    }

                    ImportDriver.createImportItems(
                        sharedModuleSourceFile,
                        '@api/auditing/shared',
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
                    ux.action.stop('Completed!');
                    break;
                }

                case 'azureAd': {
                    await BackHandler.addPackage(addCommandState);

                    ux.action.start('Installing dependencies');
                    await exec('npm', ['install', '@nestjs/passport', 'passport-azure-ad']);
                    ux.action.stop('Completed!');

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

                case 'common': {
                    await BackHandler.addPackage(addCommandState);

                    const project = CommonDriver.createProject(['tsconfig.json']);

                    // app.module.ts file
                    const appModuleSourceFile = CommonDriver.createSourceFile(project, ['src', 'app.module.ts']);
                    Installer.declareBackPackageModule(appModuleSourceFile, 'common', ['CommonModule']);
                    appModuleSourceFile.saveSync();

                    // shared.module.ts file
                    const sharedModuleSourceFile = CommonDriver.createSourceFile(project, ['src', '@aurora', 'shared.module.ts']);
                    const classDecoratorArguments = DecoratorDriver.getClassDecoratorArguments(sharedModuleSourceFile, 'SharedModule', 'Module');

                    ImportDriver.createImportItems(
                        sharedModuleSourceFile,
                        '@api/common/shared',
                        ['CommonAttachmentsService', 'CommonGetLangsFromDbService'],
                    );

                    DecoratorDriver.changeModuleDecoratorPropertyAdapter(
                        sharedModuleSourceFile,
                        'SharedModule',
                        'Module',
                        'providers',
                        'CoreGetLangsService',
                        'CommonGetLangsFromDbService',
                    );

                    const providersArray = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(classDecoratorArguments, 'providers');
                    ArrayDriver.addArrayItems(
                        appModuleSourceFile,
                        ['CommonAttachmentsService'],
                        providersArray,
                    );

                    const exportsArray = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(classDecoratorArguments, 'exports');
                    ArrayDriver.addArrayItems(
                        appModuleSourceFile,
                        ['CommonAttachmentsService'],
                        exportsArray,
                    );

                    sharedModuleSourceFile.saveSync();

                    ux.action.start('Generating graphql types');
                    await exec('npm', ['run', 'graphql:types']);
                    ux.action.stop('Completed!');
                    break;
                }

                case 'iam': {
                    await BackHandler.addPackage(addCommandState);

                    ux.action.start('Installing dependencies');
                    // await exec('npm', ['install', '@angular-material-extensions/password-strength']); TODO, sustituir por la librería de angular 17
                    ux.action.stop('Completed!');

                    const project = CommonDriver.createProject(['tsconfig.json']);

                    // app.module.ts file
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
                    ux.action.stop('Completed!');

                    break;
                }

                case 'message': {
                    await BackHandler.addPackage(addCommandState);

                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const appModuleSourceFile = CommonDriver.createSourceFile(project, ['src', 'app.module.ts']);
                    Installer.declareBackPackageModule(appModuleSourceFile, 'message', ['MessageModule']);
                    appModuleSourceFile.saveSync();

                    ux.action.start('Generating graphql types');
                    await exec('npm', ['run', 'graphql:types']);
                    ux.action.stop('Completed!');

                    break;
                }

                case 'oAuth': {
                    await BackHandler.addPackage(addCommandState);

                    ux.action.start('Installing dependencies');
                    await exec('npm', ['install', '@nestjs/jwt', '@nestjs/passport', 'passport-jwt']);
                    await exec('npm', ['install', '-D', '@types/passport-jwt']);
                    ux.action.stop('Completed!');

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
                            '@app/o-auth/shared',
                            ['AuthJwtStrategyRegistryModule', 'jwtConfig'],
                        );

                        const classDecoratorArguments = DecoratorDriver.getClassDecoratorArguments(sharedModuleSourceFile, 'SharedModule', 'Module');
                        const importsArray = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(classDecoratorArguments, 'imports');
                        // TODO, replace addElement with ArrayDriver.addArrayItems
                        importsArray.addElement('AuthJwtStrategyRegistryModule.forRoot(jwtConfig)', { useNewLines: true });
                        const exportsArray = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(classDecoratorArguments, 'exports');
                        // TODO, replace addElement with ArrayDriver.addArrayItems
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
                    ux.action.stop('Completed!');

                    break;
                }

                case 'queueManager': {
                    await BackHandler.addPackage(addCommandState);

                    ux.action.start('Installing dependencies');
                    await exec('npm', ['install', '@nestjs/bull', '@nestjs/schedule', 'bull', 'redis']);
                    ux.action.stop('Completed!');

                    const project = CommonDriver.createProject(['tsconfig.json']);

                    // app.module.ts file
                    const appModuleSourceFile = CommonDriver.createSourceFile(project, ['src', 'app.module.ts']);
                    const appModuleClassDecoratorArguments = DecoratorDriver.getClassDecoratorArguments(appModuleSourceFile, 'AppModule', 'Module');
                    Installer.declareBackPackageModule(appModuleSourceFile, 'queue-manager', ['QueueManagerModule']);

                    // add ScheduleModule
                    if (!ImportDriver.hasImportDeclarations(appModuleSourceFile, 'ScheduleModule'))
                    {
                        ImportDriver.createImportItems(
                            appModuleSourceFile,
                            '@nestjs/schedule',
                            ['ScheduleModule'],
                        );

                        const importsArray = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(appModuleClassDecoratorArguments, 'imports');
                        // TODO, replace addElement with ArrayDriver.addArrayItems
                        importsArray.addElement('ScheduleModule.forRoot()', { useNewLines: true });
                    }

                    appModuleSourceFile.saveSync();

                    ux.action.start('Generating graphql types');
                    await exec('npm', ['run', 'graphql:types']);
                    ux.action.stop('Completed!');

                    break;
                }

                case 'whatsapp': {
                    await BackHandler.addPackage(addCommandState);

                    const project = CommonDriver.createProject(['tsconfig.json']);

                    // app.module.ts file
                    const appModuleSourceFile = CommonDriver.createSourceFile(project, ['src', 'app.module.ts']);
                    Installer.declareBackPackageModule(
                        appModuleSourceFile,
                        'whatsapp',
                        ['WhatsappModule'],
                    );

                    appModuleSourceFile.saveSync();

                    ux.action.start('Generating graphql types');
                    await exec('npm', ['run', 'graphql:types']);
                    ux.action.stop('Completed!');

                    break;
                }
            }
        }

        if (args.firstArg === Scope.FRONT)
        {
            if (
                !(
                    fs.existsSync('src/@fuse') &&
                    fs.existsSync('src/@aurora')
                )
            )
            {
                throw new Error('No Aurora front application is detected in the current directory.');
            }

            switch (packageName)
            {
                case 'auditing': {
                    await FrontHandler.addPackage(addCommandState);

                    // add module in main navigation menu
                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const navigationSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'modules', 'admin', 'admin.navigation.ts']);
                    Installer.declareFrontNavigationMenu(navigationSourceFile, 'auditing', 'auditingNavigation');
                    navigationSourceFile.saveSync();

                    // add lazy loading module to app routes
                    const routesSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.routes.ts']);
                    Installer.declareFrontRouting(routesSourceFile, 'auditing');
                    routesSourceFile.saveSync();
                    break;
                }

                case 'azureAd': {
                    ux.action.start('Installing dependencies');
                    await exec('npm', ['install', '@azure/msal-angular', '@azure/msal-browser']);
                    ux.action.stop('Completed!');

                    const project = CommonDriver.createProject(['tsconfig.json']);

                    // aurora.providers.ts
                    const auroraProviderSourceFile = CommonDriver.createSourceFile(project, ['src', '@aurora', 'aurora.provider.ts']);
                    const returnArray = ArrowFunctionDriver.getReturnDefaultArrayFromVariable(
                        auroraProviderSourceFile,
                        'provideAurora',
                    );

                    // import AzureAdModule
                    ImportDriver.createImportItems(
                        auroraProviderSourceFile,
                        './modules/azure-ad',
                        ['provideAzureAd'],
                    );
                    // TODO, replace addElement with ArrayDriver.addArrayItems
                    returnArray?.addElement('provideAzureAd()', { useNewLines: true });


                    // remove AuthGuard, will be replaced by MsalGuard defined in provideAzureAd()
                    ArrayDriver.removeProviderArray(
                        returnArray,
                        'AuthGuard',
                    );

                    // remove AuthenticationService, will be replaced by AuthenticationAzureAdAdapterService defined in provideAzureAd()
                    ArrayDriver.removeProviderArray(
                        returnArray,
                        'AuthenticationService',
                    );

                    // remove AuthorizationService, will be replaced by AuthorizationAzureAdAdapterService defined in provideAzureAd()
                    ArrayDriver.removeProviderArray(
                        returnArray,
                        'AuthorizationService',
                    );

                    // remove IamService, will be replaced by IamAzureAdAdapterService defined in provideAzureAd()
                    ArrayDriver.removeProviderArray(
                        returnArray,
                        'IamService',
                    );

                    auroraProviderSourceFile.organizeImports();
                    auroraProviderSourceFile.saveSync();

                    // implement environments azure ad variables
                    const environmentFile = CommonDriver.createSourceFile(project, ['src', 'environments', 'environment.ts']);
                    const environmentVariable = VariableDriver.getVariable(environmentFile, 'environment');
                    const environmentObject = <ObjectLiteralExpression>getInitializer(environmentVariable);
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
                    const environmentProdObject = <ObjectLiteralExpression>getInitializer(environmentProdVariable);
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
                    const environmentLocalObject = <ObjectLiteralExpression>getInitializer(environmentLocalVariable);
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
                    const environmentDevObject = <ObjectLiteralExpression>getInitializer(environmentDevVariable);
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

                case 'common': {
                    await FrontHandler.addPackage(addCommandState);

                    // add module in main navigation menu
                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const navigationSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'modules', 'admin', 'admin.navigation.ts']);
                    Installer.declareFrontNavigationMenu(navigationSourceFile, 'common', 'commonNavigation');
                    navigationSourceFile.saveSync();

                    // add lazy loading module to app routes
                    const routesSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.routes.ts']);
                    Installer.declareFrontRouting(routesSourceFile, 'common');
                    routesSourceFile.saveSync();
                    break;
                }

                case 'environments': {
                    const project = CommonDriver.createProject(['tsconfig.json']);

                    // aurora.providers.ts
                    const auroraProviderSourceFile = CommonDriver.createSourceFile(project, ['src', '@aurora', 'aurora.provider.ts']);
                    const returnArray = ArrowFunctionDriver.getReturnDefaultArrayFromVariable(
                        auroraProviderSourceFile,
                        'provideAurora',
                    );
                    ArrayDriver.removeProviderArray(
                        returnArray,
                        'EnvironmentsInformationService',
                    );

                    auroraProviderSourceFile.saveSync();
                    break;
                }

                case 'iam': {
                    await FrontHandler.addPackage(addCommandState);

                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const navigationSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'modules', 'admin', 'admin.navigation.ts']);
                    Installer.declareFrontNavigationMenu(navigationSourceFile, 'iam', 'iamNavigation');
                    navigationSourceFile.saveSync();

                    const routesSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.routes.ts']);
                    Installer.declareFrontRouting(routesSourceFile, 'iam');
                    routesSourceFile.saveSync();

                    // aurora.providers.ts
                    const auroraProviderSourceFile = CommonDriver.createSourceFile(project, ['src', '@aurora', 'aurora.provider.ts']);
                    const returnArray = ArrowFunctionDriver.getReturnDefaultArrayFromVariable(
                        auroraProviderSourceFile,
                        'provideAurora',
                    );

                    // TODO, comprobar si hace falta borrar AuthorizationService
                    // remove AuthorizationService, will be replaced by AuthorizationAzureAdAdapterService defined in provideAzureAd()
                    /* ArrayDriver.removeProviderArray(
                        returnArray,
                        'AuthorizationService',
                    ); */

                    if (!ImportDriver.hasImportDeclarations(auroraProviderSourceFile, 'UserMetaStorageIamAdapterService'))
                    {
                        ImportDriver.createImportItems(
                            auroraProviderSourceFile,
                            'app/modules/admin/apps/iam',
                            ['UserMetaStorageIamAdapterService'],
                        );
                    }

                    // change UserMetaStorageService
                    ArrayDriver.changeProviderArray(
                        returnArray,
                        'UserMetaStorageService',
                        'UserMetaStorageIamAdapterService',
                    );

                    // change IamService
                    ArrayDriver.changeProviderArray(
                        returnArray,
                        'IamService',
                        'IamAuroraAdapterService',
                    );

                    auroraProviderSourceFile.saveSync();
                    break;
                }

                case 'message': {
                    await FrontHandler.addPackage(addCommandState);

                    // add module in main navigation menu
                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const navigationSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'modules', 'admin', 'admin.navigation.ts']);
                    Installer.declareFrontNavigationMenu(navigationSourceFile, 'message', 'messageNavigation');
                    navigationSourceFile.saveSync();

                    // add lazy loading module to app routes
                    const routesSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.routes.ts']);
                    Installer.declareFrontRouting(routesSourceFile, 'message');
                    routesSourceFile.saveSync();

                    break;
                }

                case 'oAuth': {
                    await FrontHandler.addPackage(addCommandState);

                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const navigationSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'modules', 'admin', 'admin.navigation.ts']);
                    Installer.declareFrontNavigationMenu(navigationSourceFile, 'oAuth', 'oAuthNavigation');
                    navigationSourceFile.saveSync();

                    const routesSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.routes.ts']);
                    Installer.declareFrontRouting(routesSourceFile, 'oAuth');
                    routesSourceFile.saveSync();

                    // aurora.providers.ts
                    const auroraProviderSourceFile = CommonDriver.createSourceFile(project, ['src', '@aurora', 'aurora.provider.ts']);
                    const returnArray = ArrowFunctionDriver.getReturnDefaultArrayFromVariable(
                        auroraProviderSourceFile,
                        'provideAurora',
                    );

                    // change AuthenticationService
                    ArrayDriver.changeProviderArray(
                        returnArray,
                        'AuthenticationService',
                        'AuthenticationAuroraAdapterService',
                    );

                    // remove AuthGuard
                    ArrayDriver.removeProviderArray(
                        returnArray,
                        'AuthGuard',
                    );

                    auroraProviderSourceFile.saveSync();
                    break;
                }

                case 'queueManager': {
                    await FrontHandler.addPackage(addCommandState);

                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const navigationSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'modules', 'admin', 'admin.navigation.ts']);
                    Installer.declareFrontNavigationMenu(navigationSourceFile, 'queueManager', 'queueManagerNavigation');
                    navigationSourceFile.saveSync();

                    const routesSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.routes.ts']);
                    Installer.declareFrontRouting(routesSourceFile, 'queueManager');
                    routesSourceFile.saveSync();
                    break;
                }

                case 'settings': {
                    await FrontHandler.addPackage(addCommandState);

                    // add module in main navigation menu
                    const project = CommonDriver.createProject(['tsconfig.json']);

                    // add lazy loading module to app routes
                    const routesSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.routes.ts']);
                    Installer.declareFrontRouting(routesSourceFile, 'settings');
                    routesSourceFile.saveSync();
                    break;
                }

                case 'whatsapp': {
                    await FrontHandler.addPackage(addCommandState);

                    const project = CommonDriver.createProject(['tsconfig.json']);
                    const navigationSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'modules', 'admin', 'admin.navigation.ts']);
                    Installer.declareFrontNavigationMenu(navigationSourceFile, 'whatsapp', 'whatsappNavigation');
                    navigationSourceFile.saveSync();

                    const routesSourceFile = CommonDriver.createSourceFile(project, ['src', 'app', 'app.routes.ts']);
                    Installer.declareFrontRouting(routesSourceFile, 'whatsapp');
                    routesSourceFile.saveSync();
                    break;
                }
            }
        }
    }
}
