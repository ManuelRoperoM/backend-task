import { Expose } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateTaskStatusDto {
    @Expose()
    @IsNotEmpty()
    @IsBoolean()
    completed: boolean
}