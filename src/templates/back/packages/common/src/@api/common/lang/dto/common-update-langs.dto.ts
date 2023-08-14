/* eslint-disable indent */
import { CommonLangDir } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class CommonUpdateLangsDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type       : String,
        description: 'image [input here api field description]',
    })
    image?: string;

    @ApiProperty({
        type       : String,
        description: 'iso6392 [input here api field description]',
    })
    iso6392?: string;

    @ApiProperty({
        type       : String,
        description: 'iso6393 [input here api field description]',
    })
    iso6393?: string;

    @ApiProperty({
        type       : String,
        description: 'ietf [input here api field description]',
    })
    ietf?: string;

    @ApiProperty({
        type       : String,
        description: 'customCode [input here api field description]',
    })
    customCode?: string;

    @ApiProperty({
        type       : CommonLangDir,
        enum       : ['LTR','RTL'],
        description: 'dir [input here api field description]',
    })
    dir?: CommonLangDir;

    @ApiProperty({
        type       : Number,
        description: 'sort [input here api field description]',
    })
    sort?: number;

    @ApiProperty({
        type       : Boolean,
        description: 'isActive [input here api field description]',
    })
    isActive?: boolean;

}
