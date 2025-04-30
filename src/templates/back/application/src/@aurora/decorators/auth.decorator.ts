/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthenticationDisabledAdapterGuard, AuthorizationDisabledAdapterGuard, Permissions } from '@aurorajs.dev/core';

export function Auth(...permissions: string[]): MethodDecorator & ClassDecorator
{
    return applyDecorators(
        Permissions(...permissions),
        UseGuards(AuthenticationDisabledAdapterGuard, AuthorizationDisabledAdapterGuard),
    );
}