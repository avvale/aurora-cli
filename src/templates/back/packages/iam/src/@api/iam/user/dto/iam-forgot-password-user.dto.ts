/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamForgotPasswordUserDto {
    @ApiProperty({
        type: String,
        description: 'email [input here api field description]',
    })
    email: string;

    @ApiProperty({
        type: String,
        description: 'origin [input here api field description]',
    })
    origin: string;
}
