import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Application_user = {
  id: number;
  email: string;
  hashed_password: string;
};

class Application_userRepository {
  async readByEmailWithPassword(email: string) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await databaseClient.execute<Rows>(
      `
      SELECT email, password, application_user.id as id
      FROM user
      INNER JOIN application_user ON user.id = application_user.user_id
      WHERE email = ?
      `,
      [email],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as Application_user;
  }
  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing user

  // async update(user: User) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an user by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new Application_userRepository();
