import { Expose } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ResponseUpdateTaskDto {
    @Expose()
    @IsNotEmpty()
    id: number
    @Expose()
    @IsNotEmpty()
    @IsString()
    title: string;
    @Expose()
    @IsOptional()
    @IsString()
    description: string
    @Expose()
    @IsNotEmpty()
    @IsBoolean()
    completed: boolean
}