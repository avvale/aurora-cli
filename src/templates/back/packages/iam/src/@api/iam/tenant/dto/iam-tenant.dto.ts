/* eslint-disable indent */
import { IamAccountDto } from '@api/iam/account';
import { ApiProperty } from '@nestjs/swagger';

export class IamTenantDto {
    @ApiProperty({
        type: String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type: Number,
        description: 'rowId [input here api field description]',
    })
    rowId: number;

    @ApiProperty({
        type: String,
        description: 'parentId [input here api field description]',
        example: '186fc6f7-0160-5e63-9872-355a648c32d2',
    })
    parentId?: string;

    @ApiProperty({
        type: () => IamTenantDto,
        description: 'IamTenant [input here api field description]',
    })
    parent?: IamTenantDto;

    @ApiProperty({
        type: String,
        description: 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type: String,
        description: 'code [input here api field description]',
    })
    code?: string;

    @ApiProperty({
        type: Object,
        description: 'logo [input here api field description]',
    })
    logo?: any;

    @ApiProperty({
        type: Boolean,
        description: 'isActive [input here api field description]',
        example: true,
    })
    isActive: boolean;

    @ApiProperty({
        type: Object,
        description: 'meta [input here api field description]',
    })
    meta?: any;

    @ApiProperty({
        type: () => [IamAccountDto],
        description: 'accounts [input here api field description]',
    })
    accounts?: IamAccountDto[];

    @ApiProperty({
        type: String,
        description: 'Timestamp when the tenant was created',
    })
    createdAt?: string;

    @ApiProperty({
        type: String,
        description: 'Timestamp when the tenant was last updated',
    })
    updatedAt?: string;

    @ApiProperty({
        type: String,
        description: 'Timestamp when the tenant was deleted',
    })
    deletedAt?: string;
}
