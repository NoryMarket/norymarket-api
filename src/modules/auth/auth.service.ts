import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";
import { CreateUserDTO, UserDTO } from "./types";

@Injectable()
export class AuthService {
  constructor(private supabase: SupabaseService) {}

  async getUsers() {
    const { data, error } = await this.supabase.admin.auth.admin.listUsers();

    const users = data
      ? data.users.map((user) => new UserDTO(user))
      : undefined;

    return { users, error };
  }

  async createUser({ email, password, role }: CreateUserDTO) {
    const { data, error } = await this.supabase.admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      role,
    });

    if (error) throw new InternalServerErrorException();

    return new UserDTO(data.user);
  }

  async deleteUser(userId: string) {
    const { error } = await this.supabase.admin.auth.admin.deleteUser(userId);

    if (error) throw new InternalServerErrorException();
  }

  async setUserActiveStatus(userId: string, active: boolean) {
    const { error, data } = await this.supabase.admin.auth.admin.updateUserById(
      userId,
      {
        ban_duration: active ? "none" : `${24 * 30 * 12 * 100}h`,
      },
    );

    if (error) throw new InternalServerErrorException();

    return new UserDTO(data.user);
  }
}
