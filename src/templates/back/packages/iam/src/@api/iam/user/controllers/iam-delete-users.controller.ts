/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamDeleteUsersHandler, IamUserDto } from '@api/iam/user';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] user')
@Controller('iam/users/delete')
@Auth('iam.user.delete')
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
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
