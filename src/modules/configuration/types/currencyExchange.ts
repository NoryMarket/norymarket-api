import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString, IsUUID, Min } from "class-validator";
import { CurrencyRate } from "src/generated/prisma/client";

export class CreateCurrencyExchangeDTO {
  @IsString()
  @IsUUID("4")
  @ApiProperty({ type: "string" })
  currencyTypeId: string;

  @IsNumber({})
  @Min(0)
  @ApiProperty({ type: "number" })
  factor: number;
}

export class CurrencyExchangeDTO {
  @ApiProperty({ type: "string" })
  id: string;

  @ApiProperty({ type: "string" })
  currencyTypeId: string;

  @ApiProperty({ type: "number" })
  factor: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: "boolean" })
  isReadonly: boolean;

  constructor({
    id,
    factor,
    createdAt,
    currencyTypeId,
    updatedAt,
    isReadonly,
  }: CurrencyRate) {
    this.id = id;
    this.createdAt = createdAt;
    this.currencyTypeId = currencyTypeId;
    this.factor = factor;
    this.updatedAt = updatedAt;
    this.isReadonly = isReadonly;
  }
}

export class DeleteCurrencyExchangesDTO {
  @IsArray()
  @IsString({ each: true })
  @IsUUID("4", { each: true })
  @ApiProperty({ type: "string", isArray: true })
  ids: string[];
}
