/* eslint-disable @typescript-eslint/ban-types */
import { Permissions } from '@aurorajs.dev/core';
import { applyDecorators, UseGuards } from '@nestjs/common';

export function Auth(
    ...permissions: string[]
): MethodDecorator & ClassDecorator {
    return applyDecorators(
        Permissions(...permissions),
        UseGuards(AuthenticationDisabledAdapterGuard, AuthorizationDisabledAdapterGuard),
    );
}
