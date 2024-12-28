import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class ResponseDeleteTaskDto {
    @Expose()
    @IsNotEmpty()
    @IsString()
    status: string;
    @Expose()
    @IsNotEmpty()
    @IsString()
    msge: string;
}