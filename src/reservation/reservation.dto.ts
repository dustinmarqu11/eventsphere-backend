import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  eventId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  numberOfTickets: number;
}

export class UpdateReservationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  numberOfTickets?: number;

  @IsOptional()
  @IsString()
  status?: string; // Confirmed, Cancelled
}