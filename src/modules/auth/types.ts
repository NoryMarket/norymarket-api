import { ApiProperty } from "@nestjs/swagger";
import { User } from "@supabase/supabase-js";
import moment from "moment";
import { Permissions, ROOT_PERMISSION } from "./constants";

export class UserDTO {
  @ApiProperty({ type: "string" })
  id: User["id"];

  @ApiProperty({ type: "string" })
  email: User["email"];

  @ApiProperty({ type: "string" })
  lastSignInAt: User["last_sign_in_at"];

  @ApiProperty({ type: "string" })
  role: User["role"];

  @ApiProperty({ type: "string", nullable: true })
  bannedUntil: User["banned_until"];

  @ApiProperty({ type: "boolean" })
  active: boolean;

  constructor(_user: User) {
    this.id = _user.id;
    this.email = _user.email;
    this.lastSignInAt = _user.last_sign_in_at;
    this.role = _user.role;
    this.bannedUntil = _user.banned_until;

    this.active =
      !_user.banned_until || moment(_user.banned_until).isBefore(moment());
  }
}

export class CreateUserDTO {
  @ApiProperty({ type: "string" })
  email: User["email"];

  @ApiProperty({ type: "string" })
  password: string;

  @ApiProperty({ type: "string" })
  role: string;
}

export class RoleDTO {
  @ApiProperty({ type: "string" })
  id: string;

  @ApiProperty({ type: "string" })
  name: string;

  @ApiProperty({ enum: Permissions, isArray: true })
  permissions: (Permissions | typeof ROOT_PERMISSION)[];
}

export class AuthorizationMetaDTO {
  @ApiProperty({ enum: Permissions, isArray: true })
  permissions: Permissions[];

  @ApiProperty({ type: RoleDTO, isArray: true })
  roles: RoleDTO[];
}
