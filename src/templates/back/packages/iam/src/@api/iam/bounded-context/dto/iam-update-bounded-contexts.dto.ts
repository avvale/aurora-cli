/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamUpdateBoundedContextsDto {
    @ApiProperty({
        type: String,
        description: 'UUID for bounded context',
    })
    id?: string;

    @ApiProperty({
        type: String,
        description: 'Name of the bounded context',
    })
    name?: string;

    @ApiProperty({
        type: String,
        description: 'root folder where the bounded context is located',
    })
    root?: string;

    @ApiProperty({
        type: Number,
        description: 'Sort order of the bounded context',
    })
    sort?: number;

    @ApiProperty({
        type: Boolean,
        description: 'Indicates if the bounded context is active',
        example: true,
    })
    isActive?: boolean;
}
