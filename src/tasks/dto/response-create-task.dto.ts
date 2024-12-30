import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ResponseCreateTaskDto {
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
    @Expose()
    description: string;
    @Expose()
    @IsNotEmpty()
    @IsString()
    createdAt: Date;
}