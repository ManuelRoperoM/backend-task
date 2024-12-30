import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsOptional()
    @IsString()
    description: string
    @IsOptional()
    @IsBoolean()
    completed: boolean
}