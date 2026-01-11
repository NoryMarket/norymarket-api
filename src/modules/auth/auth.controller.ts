import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseBoolPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOkResponse } from "@nestjs/swagger";
import {
  AuthorizationMetaDTO,
  CreateUserDTO,
  DeleteUserDTO,
  UpdateUserDTO,
  UserDTO,
} from "./types";
import { allPermissions, roles } from "./constants";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("users")
  @ApiOkResponse({ type: UserDTO, isArray: true })
  async getUsers() {
    const { users, error } = await this.authService.getUsers();

    if (error) throw new InternalServerErrorException();

    return users;
  }

  @Post("user")
  @ApiOkResponse({ type: UserDTO })
  async createUser(@Body() body: CreateUserDTO) {
    return await this.authService.createUser(body);
  }

  @Patch("user/:userId")
  @ApiOkResponse({ type: UserDTO })
  async updateUser(
    @Param("userId", ParseUUIDPipe) userId: string,
    @Body() body: UpdateUserDTO,
  ) {
    return await this.authService.updateUser(userId, { ...body });
  }

  @Delete("users")
  @ApiOkResponse({ type: "string", isArray: true })
  async deleteUser(@Body() { users }: DeleteUserDTO) {
    return await this.authService.deleteUsers(...users);
  }

  @Patch("user/status/:userId/:status")
  @ApiOkResponse({ type: UserDTO })
  async setUserActiveStatus(
    @Param("userId", ParseUUIDPipe) userId: string,
    @Param("status", ParseBoolPipe) status: boolean,
  ) {
    return await this.authService.setUserActiveStatus(userId, status);
  }

  @Get("authorization/meta")
  @ApiOkResponse({ type: AuthorizationMetaDTO })
  getAuthorizationMeta(): AuthorizationMetaDTO {
    const meta = new AuthorizationMetaDTO();
    meta.permissions = allPermissions;
    meta.roles = roles;
    return meta;
  }
}
