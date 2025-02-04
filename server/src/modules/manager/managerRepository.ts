import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Manager = {
  id: number;
  last_name: string;
  first_name: string;
  email: string;
  enterprise_id?: number;
  application_user_id?: number;
  hashed_password: string;
  password: string;
  user_id?: number;
};

type CreatableManager = {
  enterprise_id: number;
  hashed_password: string;
  user_id: number;
};

class ManagerRepository {
  async create(manager: CreatableManager) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      const [applicationUserResult] = await connection.query<Result>(
        "INSERT INTO application_user (password, user_id) VALUES (?, ?)",
        [manager.hashed_password, manager.user_id],
      );

      const applicationUserId = applicationUserResult.insertId;

      if (!applicationUserId) {
        throw new Error(
          "Failed to insert into 'user' table. Transaction rolled back.",
        );
      }

      const [managerResult] = await connection.query<Result>(
        "INSERT INTO manager (application_user_id, enterprise_id) VALUES (?, ?)",
        [applicationUserId, manager.enterprise_id],
      );
      if (!managerResult.insertId) {
        throw new Error(
          "Failed to insert into 'manager' table. Transaction rolled back.",
        );
      }

      await connection.commit();

      return managerResult.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT last_name, first_name, email, name
      FROM manager
      INNER JOIN application_user ON manager.application_user_id = application_user.id
      INNER JOIN user ON application_user.user_id = user.id
      INNER JOIN enterprise ON manager.enterprise_id = enterprise.id
      WHERE manager.id = ?`,
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Manager;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "manager" table
    const [rows] = await databaseClient.query<Rows>(`
      SELECT last_name, first_name, email, name
      FROM manager
      INNER JOIN application_user ON manager.application_user_id = application_user.id
      INNER JOIN user ON application_user.user_id = user.id
      INNER JOIN enterprise ON manager.enterprise_id = enterprise.id
      `);

    // Return the array of items
    return rows as Manager[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async update(manager: Manager) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      const [applicationUserResult] = await connection.query<Result>(
        `
          UPDATE application_user 
          SET password = ? 
          WHERE id = (
            SELECT application_user_id 
            FROM manager 
            WHERE id = ?
          )`,
        [manager.hashed_password, manager.id],
      );

      const applicationUserId = applicationUserResult.affectedRows > 0;

      if (!applicationUserId) {
        throw new Error(
          "Failed to insert into 'user' table. Transaction rolled back.",
        );
      }

      const [managerResult] = await connection.query<Result>(
        `
          UPDATE user
          SET last_name = ?, first_name = ?, email = ?
          WHERE id = (
            SELECT user_id
            FROM application_user
            WHERE id = (
              SELECT application_user_id
              FROM manager
              WHERE id = ?
            )
          )`,
        [manager.last_name, manager.first_name, manager.email, manager.id],
      );
      if (!managerResult.affectedRows) {
        throw new Error(
          "Failed to insert into 'manager' table. Transaction rolled back.",
        );
      }

      await connection.commit();

      return managerResult.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  async delete(id: number) {
    try {
      const [result] = await databaseClient.query<Result>(
        `
      DELETE FROM application_user 
        WHERE id = (
          SELECT application_user_id
          FROM manager
          WHERE id = ?
          )`,
        [id],
      );
      return result.affectedRows;
    } catch (error) {
      throw new Error(`Failed to delete with ID ${id}`);
    }
  }

  async readByEmailWithPassword(email: string) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT email, password, application_user.id
      FROM user
      INNER JOIN application_user ON user.id = application_user.user_id
      WHERE email = ?;
      `,
      [email],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as Manager;
  }
}

export default new ManagerRepository();
