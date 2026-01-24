/* eslint-disable indent */
import { IamAccountDto } from '@api/iam/account';
import { IamRoleDto } from '@api/iam/role';
import { ApiProperty } from '@nestjs/swagger';

export class IamRoleAccountDto {
  @ApiProperty({
    type: String,
    description: 'roleId [input here api field description]',
    example: 'ab346a5d-bde9-59fd-a36a-b60458aed754',
  })
  roleId: string;

  @ApiProperty({
    type: () => IamRoleDto,
    description: 'IamRole [input here api field description]',
  })
  role?: IamRoleDto;

  @ApiProperty({
    type: String,
    description: 'accountId [input here api field description]',
    example: 'bb311dbd-dd0b-5412-bf15-ca58a8aa48db',
  })
  accountId: string;

  @ApiProperty({
    type: () => IamAccountDto,
    description: 'IamAccount [input here api field description]',
  })
  account?: IamAccountDto;
}
