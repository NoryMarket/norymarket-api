import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  // Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from "@nestjs/common";
import { SupplyTypeService } from "./supply_type.service";
import {
  CreateSupplyTypeDto,
  SupplyTypeDto,
  UpdateSupplyTypeDto,
} from "./dto/supplyType";

import { ApiOkResponse } from "@nestjs/swagger";
import { MultiDeleteEntityDTO } from "../types/common.dto";
// import { CreateSupplyTypeDto, UpdateSupplyTypeDto } from "./dto/supplyType";

@Controller("supply-type")
export class SupplyTypeController {
  constructor(private readonly supplyTypeService: SupplyTypeService) {}

  @ApiOkResponse({ type: SupplyTypeDto })
  @Post()
  async create(@Body() data: CreateSupplyTypeDto) {
    return await this.supplyTypeService.create(data);
  }

  @ApiOkResponse({ type: SupplyTypeDto, isArray: true })
  @Get()
  async findAll() {
    return await this.supplyTypeService.findAll();
  }

  @ApiOkResponse({ type: SupplyTypeDto })
  @Patch(":id")
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateSupplyTypeDto: UpdateSupplyTypeDto,
  ) {
    return await this.supplyTypeService.update(id, updateSupplyTypeDto);
  }

  @ApiOkResponse({ type: "string", isArray: true })
  @Delete(":id")
  async remove(@Body() { ids }: MultiDeleteEntityDTO) {
    return await this.supplyTypeService.remove(ids);
  }
}
