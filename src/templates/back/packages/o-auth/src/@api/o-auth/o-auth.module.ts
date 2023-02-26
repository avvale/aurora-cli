import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { OAuthSeeder } from './o-auth.seeder';
import { OAuthModels, OAuthHandlers, OAuthServices, OAuthRepositories, OAuthSagas } from '@app/o-auth';
import { OAuthApplicationControllers, OAuthApplicationResolvers, OAuthApplicationApiHandlers, OAuthApplicationServices } from './application';
import { OAuthClientControllers, OAuthClientResolvers, OAuthClientApiHandlers, OAuthClientServices } from './client';
import { OAuthAccessTokenControllers, OAuthAccessTokenResolvers, OAuthAccessTokenApiHandlers, OAuthAccessTokenServices } from './access-token';
import { OAuthRefreshTokenControllers, OAuthRefreshTokenResolvers, OAuthRefreshTokenApiHandlers, OAuthRefreshTokenServices } from './refresh-token';
import { OAuthCredentialControllers, OAuthCredentialResolvers, OAuthCredentialApiHandlers } from './credential';
import { OAuthScopeControllers, OAuthScopeResolvers, OAuthScopeApiHandlers, OAuthScopeServices } from './scope';
import { IamCreatePermissionsFromRolesService } from '@app/iam/permission-role/application/services/iam-create-permissions-from-roles.service';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
                ...OAuthModels
            ])
    ],
    controllers: [
        ...OAuthApplicationControllers,
        ...OAuthClientControllers,
        ...OAuthAccessTokenControllers,
        ...OAuthRefreshTokenControllers,
        ...OAuthCredentialControllers,
        ...OAuthScopeControllers
    ],
    providers: [
        OAuthSeeder,
        ...OAuthHandlers,
        ...OAuthServices,
        ...OAuthRepositories,
        ...OAuthSagas,
        ...OAuthApplicationResolvers,
        ...OAuthApplicationApiHandlers,
        ...OAuthClientResolvers,
        ...OAuthClientApiHandlers,
        ...OAuthAccessTokenResolvers,
        ...OAuthAccessTokenApiHandlers,
        ...OAuthRefreshTokenResolvers,
        ...OAuthRefreshTokenApiHandlers,
        ...OAuthCredentialResolvers,
        ...OAuthCredentialApiHandlers,
        ...OAuthScopeResolvers,
        ...OAuthScopeApiHandlers,

        // ---- customizations ----
        IamCreatePermissionsFromRolesService,
        ...OAuthAccessTokenServices,
        ...OAuthApplicationServices,
        ...OAuthClientServices,
        ...OAuthRefreshTokenServices,
        ...OAuthScopeServices
    ],
})
export class OAuthModule {}
