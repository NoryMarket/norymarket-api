import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CurrencyType } from "src/generated/prisma/client";

export class CreateCurrencyTypeDTO {
  @ApiProperty({ type: "string" })
  @IsString()
  name: string;

  @ApiProperty({ type: "string" })
  @IsString()
  shortName: string;
}

export class UpdateCurrencyTypeDTO {
  @ApiProperty({ type: "string" })
  @IsString()
  name?: string;

  @ApiProperty({ type: "string" })
  @IsString()
  shortName?: string;
}

export class CurrencyTypeDTO {
  @ApiProperty({ type: "string" })
  id: string;

  @ApiProperty({ type: "string" })
  name: string;

  @ApiProperty({ type: "string" })
  shortName: string;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  constructor({ id, name, shortName, updatedAt }: CurrencyType) {
    this.id = id;
    this.name = name;
    this.shortName = shortName;
    this.updatedAt = updatedAt;
  }
}
