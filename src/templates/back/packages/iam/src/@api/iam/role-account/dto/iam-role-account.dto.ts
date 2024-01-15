/* eslint-disable indent */
import { IamAccountDto } from '@api/iam/account';
import { IamRoleDto } from '@api/iam/role';
import { ApiProperty } from '@nestjs/swagger';

export class IamRoleAccountDto
{
    @ApiProperty({
        type       : String,
        description: 'roleId [input here api field description]',
    })
    roleId: string;

    @ApiProperty({
        type       : () => IamRoleDto,
        description: 'IamRole [input here api field description]',
    })
    role?: IamRoleDto;

    @ApiProperty({
        type       : String,
        description: 'accountId [input here api field description]',
    })
    accountId: string;

    @ApiProperty({
        type       : () => IamAccountDto,
        description: 'IamAccount [input here api field description]',
    })
    account?: IamAccountDto;

}
