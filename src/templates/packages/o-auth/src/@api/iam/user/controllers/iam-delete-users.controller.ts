/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamUserDto } from '../dto';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { IamDeleteUsersHandler } from '../handlers/iam-delete-users.handler';

@ApiTags('[iam] user')
@Controller('iam/users/delete')
@Permissions('iam.user.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamDeleteUsersController
{
    constructor(
        private readonly handler: IamDeleteUsersHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete users in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [IamUserDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}