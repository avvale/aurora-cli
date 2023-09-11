/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamUpdateRolesAccountsDto
{
    @ApiProperty({
        type       : String,
        description: 'roleId [input here api field description]',
    })
    roleId?: string;

    @ApiProperty({
        type       : String,
        description: 'accountId [input here api field description]',
    })
    accountId?: string;

}
