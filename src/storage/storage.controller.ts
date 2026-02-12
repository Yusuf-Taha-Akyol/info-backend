import { Controller, Post, Body, UseGuards, Req} from '@nestjs/common';
import { StorageService } from './storage.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateFileDto } from './dto/create-file.dto';

@UseGuards(JwtAuthGuard)
@Controller('storage')
export class StorageController {
    constructor(private readonly storageService: StorageService) {}

    @Post()
    async create(
        @Req() req,
        @Body() dto: CreateFileDto,
    ) {
        return this.storageService.createMetadata(
            req.user.id,
            dto,
        );
    }
}
