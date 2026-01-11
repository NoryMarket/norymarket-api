import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ConfigurationService } from "./configuration.service";
import {
  CreateCurrencyTypeDTO,
  CurrencyTypeDTO,
  UpdateCurrencyTypeDTO,
} from "./types/currencyType";

import { ApiOkResponse } from "@nestjs/swagger";

@Controller("configuration")
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Post("currencyType")
  @ApiOkResponse({ type: CurrencyTypeDTO })
  async createCurrencyType(
    @Body() data: CreateCurrencyTypeDTO,
  ): Promise<CurrencyTypeDTO> {
    return await this.configurationService.createCurrencyType(data);
  }

  @Patch("currencyType/:currencyTypeId")
  @ApiOkResponse({ type: CurrencyTypeDTO })
  async updateCurrencyType(
    @Param("currencyTypeId", ParseUUIDPipe) id: string,
    @Body() data: UpdateCurrencyTypeDTO,
  ) {
    return await this.configurationService.updateCurrencyType(id, data);
  }

  @Delete("currencyType/:currencyTypeId")
  async deleteCurrencyType(@Param("currencyTypeId", ParseUUIDPipe) id: string) {
    return await this.configurationService.deleteCurrencyType(id);
  }

  @ApiOkResponse({ type: CurrencyTypeDTO, isArray: true })
  @Get("currencyTypes")
  async getCurrencyType() {
    return await this.configurationService.getCurrencyTypes();
  }
}
