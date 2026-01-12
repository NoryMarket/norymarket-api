import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, IsUUID } from "class-validator";
import { Color, Size, SupplyType } from "src/generated/prisma/client";

export class CreateSupplyTypeDto {
  @IsString()
  @ApiProperty({ type: "string" })
  name: string;

  @IsString()
  @IsUUID("4")
  @ApiProperty({ type: "string" })
  quantityUnitId: string;

  @IsArray()
  @IsString({ each: true })
  @IsUUID("4", { each: true })
  @ApiProperty({ type: "string", isArray: true })
  sizes: string[];

  @IsArray()
  @IsString({ each: true })
  @IsUUID("4", { each: true })
  @ApiProperty({ type: "string", isArray: true })
  colors: string[];
}

export class UpdateSupplyTypeDto {
  @IsString()
  @ApiProperty({ type: "string" })
  name?: string;

  @IsString()
  @IsUUID("4")
  @ApiProperty({ type: "string" })
  quantityUnitId?: string;

  @IsArray()
  @IsString({ each: true })
  @IsUUID("4", { each: true })
  @ApiProperty({ type: "string", isArray: true })
  sizes?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsUUID("4", { each: true })
  @ApiProperty({ type: "string", isArray: true })
  colors?: string[];
}

export class SupplyTypeDto {
  @ApiProperty({ type: "string" })
  id: string;

  @ApiProperty({ type: "string" })
  name: string;

  @ApiProperty({ type: "string" })
  quantityUnitId: string;

  @ApiProperty({ type: "string", isArray: true })
  sizes: string[];

  @ApiProperty({ type: "string", isArray: true })
  colors: string[];

  constructor({
    id,
    name,
    quantityUnitId,
    colors,
    sizes,
  }: SupplyType & {
    sizes?: (Pick<Size, "id"> | Size["id"])[];
    colors?: (Pick<Color, "id"> | Color["id"])[];
  }) {
    this.id = id;
    this.name = name;
    this.quantityUnitId = quantityUnitId;
    this.sizes =
      sizes?.map((size) => (typeof size === "string" ? size : size.id)) ?? [];

    this.colors =
      colors?.map((color) => (typeof color === "string" ? color : color.id)) ??
      [];
  }
}
