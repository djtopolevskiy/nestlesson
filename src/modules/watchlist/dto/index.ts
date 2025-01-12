import { IsString } from 'class-validator';

export class WatchlistDto {
  @IsString()
  name: string;

  @IsString()
  assetId: string;
}
