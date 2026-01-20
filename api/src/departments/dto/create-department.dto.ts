import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateDepartmentDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    comment?: string;

    @IsUUID()
    organizationId: string;

    @IsOptional()
    @IsUUID()
    parentDepartmentId?: string;
}