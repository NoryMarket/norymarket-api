import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, IsUUID, Length } from "class-validator";
import { Size } from "src/generated/prisma/client";

export class CreateSizeDTO {
  @IsString()
  @Length(3)
  @ApiProperty({ type: "string" })
  name: string;

  @IsString()
  @ApiProperty({ type: "string" })
  shortName: string;
}

export class UpdateSizeDTO {
  @IsString()
  @Length(3)
  @ApiProperty({ type: "string" })
  name?: string;

  @IsString()
  @ApiProperty({ type: "string" })
  shortName?: string;
}

export class SizeDTO {
  @ApiProperty({ type: "string" })
  id: string;

  @ApiProperty({ type: "string" })
  name: string;

  @ApiProperty({ type: "string" })
  shortName: string;

  constructor({ id, shortName, name }: Size) {
    this.id = id;
    this.shortName = shortName;
    this.name = name;
  }
}

export class DeleteSizeDTO {
  @IsArray()
  @IsString({ each: true })
  @IsUUID("4", { each: true })
  @ApiProperty({ type: "string", isArray: true })
  ids: string[];
}
