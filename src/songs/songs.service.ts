import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SongsService {
  db: PrismaService;

  constructor(db: PrismaService) {
    this.db = db;
  }
  create(createSongDto: CreateSongDto) {
    return this.db.song.create({
      data: createSongDto,
    });
  }

  findAll() {
    return this.db.song.findMany();
  }

  findOne(id: number) {
    return this.db.song.findUnique({ where: { id } });
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    try {
      return this.db.song.update({
        where: { id },
        data: updateSongDto,
      });
    } catch {
      return undefined;
    }
  }

  async remove(id: number) {
    try {
      await this.db.song.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }

  freeSongs() {
    return this.db.song.findMany({ where: { ar: 0 } });
  }

  topSongs(count: number = 10) {
    count = parseInt(count.toString(), 10);
    return this.db.song.findMany({
      take: count,
      orderBy: { ertekeles: 'desc' },
    });
  }

  async popularArtists() {
    return (
      await this.db.song.groupBy({
        by: ['szerzo'],
        _count: true,
        orderBy: {
          _count: {
            szerzo: 'desc',
          },
        },
      })
    ).map((x) => ({
      szerzo: x.szerzo,
      numberOfSongs: x._count,
    }));
  }
}
