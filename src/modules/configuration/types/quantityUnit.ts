import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";
import { QuantityUnit } from "src/generated/prisma/client";

export class CreateQuantityUnitDto {
  @IsBoolean()
  @ApiProperty({ type: "boolean" })
  allowDecimals: boolean;

  @IsString()
  @ApiProperty({ type: "string" })
  name: string;

  @IsString()
  @ApiProperty({ type: "string" })
  description?: string;

  @IsString()
  @ApiProperty({ type: "string" })
  shortName: string;
}

export class UpdateQuantityUnitDto {
  @IsBoolean()
  @ApiProperty({ type: "boolean" })
  allowDecimals?: boolean;

  @IsString()
  @ApiProperty({ type: "string" })
  name?: string;

  @IsString()
  @ApiProperty({ type: "string" })
  description?: string;

  @IsString()
  @ApiProperty({ type: "string" })
  shortName?: string;
}

export class QuantityUnitDto {
  @ApiProperty({ type: "string" })
  id: string;

  @ApiProperty({ type: "boolean" })
  allowDecimals: boolean;

  @ApiProperty({ type: "string" })
  name: string;

  @ApiProperty({ type: "string" })
  description?: string;

  @ApiProperty({ type: "string" })
  shortName: string;

  constructor({
    id,
    allowDecimals,
    name,
    description,
    shortName,
  }: QuantityUnit) {
    this.id = id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.allowDecimals = allowDecimals;
    this.description = description ?? undefined;
    this.name = name;
    this.shortName = shortName;
  }
}
