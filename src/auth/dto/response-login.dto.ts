import { Expose } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"

export class ResponseLoginDto {
    @Expose()
    @IsNotEmpty()
    @IsString()
    status: string
    @Expose()
    @IsNotEmpty()
    @IsString()
    token: string
}