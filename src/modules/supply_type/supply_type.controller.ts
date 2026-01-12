import {
  Controller,
  // Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from "@nestjs/common";
import { SupplyTypeService } from "./supply_type.service";
// import { CreateSupplyTypeDto, UpdateSupplyTypeDto } from "./dto/supplyType";

@Controller("supply-type")
export class SupplyTypeController {
  constructor(private readonly supplyTypeService: SupplyTypeService) {}

  // @Post()
  // create(@Body() createSupplyTypeDto: CreateSupplyTypeDto) {
  //   return this.supplyTypeService.create();
  // }

  // @Get()
  // findAll() {
  //   return this.supplyTypeService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.supplyTypeService.findOne(+id);
  // }

  // @Patch(":id")
  // update(
  //   @Param("id") id: string,
  //   @Body() updateSupplyTypeDto: UpdateSupplyTypeDto,
  // ) {
  //   return this.supplyTypeService.update(+id, updateSupplyTypeDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.supplyTypeService.remove(+id);
  // }
}
