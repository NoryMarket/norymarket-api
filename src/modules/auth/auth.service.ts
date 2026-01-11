import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "./types";
import { User } from "@supabase/supabase-js";

@Injectable()
export class AuthService {
  constructor(private supabase: SupabaseService) {}

  async getUsers() {
    const { data, error } = await this.supabase.admin.auth.admin.listUsers();

    const users = data
      ? data.users.map((user: User) => new UserDTO(user))
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

  async deleteUsers(...users: string[]) {
    const deletedUsers: string[] = [];

    for (const userId of users) {
      const { error } = await this.supabase.admin.auth.admin.deleteUser(userId);

      if (error) throw new InternalServerErrorException();

      deletedUsers.push(userId);
    }

    return deletedUsers;
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

  async updateUser(userId: string, { email, role }: UpdateUserDTO) {
    const { data, error } = await this.supabase.admin.auth.admin.updateUserById(
      userId,
      {
        email,
        role,
      },
    );

    if (error || !data) throw new InternalServerErrorException(error);

    return new UserDTO(data.user);
  }
}
