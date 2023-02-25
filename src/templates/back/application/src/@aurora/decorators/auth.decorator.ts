/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthenticationGuard, AuthorizationGuard, Permissions } from '@aurora-ts/core';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';

export function Auth(permissions): Function
{
    return applyDecorators(
        Permissions(permissions),
        UseGuards(AuthenticationDisabledAdapterGuard, AuthorizationDisabledAdapterGuard),
    );
}