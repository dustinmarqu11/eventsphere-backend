import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsNumber()
  organizerId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDateString()
  eventDate: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  ticketPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  capacity: number;
}

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  eventDate?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  ticketPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  capacity?: number;
}