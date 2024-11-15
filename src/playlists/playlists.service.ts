import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlaylistsService {
  db: PrismaService;

  constructor(db: PrismaService) {
    this.db = db;
  }
  create(createPlaylistDto: CreatePlaylistDto) {
    return this.db.playlist.create({
      data: createPlaylistDto,
    });
  }
  addSongToPlaylist(playlistId: number, songId: number) {
    return this.db.playlist.update({
      where: { playlistId: playlistId },
      data: {
        songs: {
          connect: { id: songId },
        },
      },
    });
  }

  findAll() {
    return `This action returns all playlists`;
  }

  async findOne(id: number) {
    const data = await this.db.playlist.findUnique({
      where: { playlistId: id },
      include: { songs: true },
    });
    return {
      data,
      message: `Playlist with the id of: ${id}`,
    };
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return this.db.playlist.delete({
      where: { playlistId: id },
    });
  }

  async removeSongFromPlaylist(playlistId: number, songId: number) {
    const data = await this.db.playlist.update({
      where: { playlistId: playlistId },
      data: {
        songs: {
          disconnect: { id: songId },
        },
      },
    });
    return {
      data,
      message: `Song removed from playlist with the id of: ${songId} `,
    };
  }
}
