import { IsString, IsNotEmpty } from 'class-validator';

class BodyPlanetDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Weather cannot be empty' })
  weather: string;

  @IsNotEmpty({ message: 'Ground cannot be empty' })
  @IsString()
  ground: boolean;
}

export { BodyPlanetDto };
