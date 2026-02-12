import { FileType } from '../entities/file.entity';

export class CreateFileDto {
    type: FileType;
    size: number;
    tags?: string[];
}