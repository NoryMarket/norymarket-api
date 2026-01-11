import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsHexColor, IsString, IsUUID, Length } from "class-validator";
import { Color } from "src/generated/prisma/client";

export class CreateColorDTO {
  @IsString()
  @Length(3)
  @ApiProperty({ type: "string" })
  name: string;

  @IsString()
  @IsHexColor()
  @ApiProperty({ type: "string" })
  color: string;
}

export class UpdateColorDTO {
  @IsString()
  @Length(3)
  @ApiProperty({ type: "string" })
  name?: string;

  @IsString()
  @IsHexColor()
  @ApiProperty({ type: "string" })
  color?: string;
}

export class ColorDTO {
  @ApiProperty({ type: "string" })
  id: string;

  @ApiProperty({ type: "string" })
  name: string;

  @ApiProperty({ type: "string" })
  color?: string;

  constructor({ color, id, name }: Color) {
    this.id = id;
    this.color = color;
    this.name = name;
  }
}

export class DeleteColorDTO {
  @IsArray()
  @IsString({ each: true })
  @IsUUID("4", { each: true })
  @ApiProperty({ type: "string", isArray: true })
  ids: string[];
}
