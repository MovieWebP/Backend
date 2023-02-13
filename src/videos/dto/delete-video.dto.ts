import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dto/core.dto';

export class DeleteVideoInput {
  @ApiProperty({ type: Number })
  @IsNumber()
  videoId: number;
}

export class DeleteVideoOutput extends CoreOutput {}
