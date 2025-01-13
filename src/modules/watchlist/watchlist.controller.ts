import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { WatchlistDto } from './dto';
import { WatchlistService } from './watchlist.service';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(@Body() assetDto: WatchlistDto, @Req() request) {
    const user = request.user;
    return this.watchlistService.createAsset(user, assetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query('id') assetId: string, @Req() request): Promise<boolean> {
    const { id } = request.user;
    return this.watchlistService.deleteAsset(id, assetId);
  }
}
