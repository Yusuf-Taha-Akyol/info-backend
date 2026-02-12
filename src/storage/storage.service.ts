import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { CreateFileDto} from './dto/create-file.dto';

@Injectable()
export class StorageService {
    constructor(
        @InjectRepository(File)
        private fileRepository: Repository<File>,
    ) {}

    async createMetadata(userId: number, dto: CreateFileDto) {
        const { type, size, tags } = dto;

        const file = this.fileRepository.create({
            ownerId: userId,
            type,
            size,
            tags,
        });

        return this.fileRepository.save(file);
    }
}
