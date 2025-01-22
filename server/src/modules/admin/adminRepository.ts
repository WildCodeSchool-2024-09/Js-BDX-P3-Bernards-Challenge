import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  mail: string;
  first_name?: string;
};

type AdminData = {
  email: string;
  last_name: string;
  first_name: string;
  password: string;
};

class AdminRepository {
  async create(adminData: AdminData) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      const [userResult] = await connection.query<Result>(
        "INSERT INTO user (email, first_name, last_name) VALUES (?, ?, ?)",
        [adminData.email, adminData.first_name, adminData.last_name],
      );

      const userId = userResult.insertId;
      if (!userId) {
        throw new Error("Failed insert into user");
      }

      const [appUserResult] = await connection.query<Result>(
        "INSERT INTO application_user (password, user_id) VALUES (?, ?)",
        [adminData.password, userId],
      );

      const applicationUserId = appUserResult.insertId;
      if (!applicationUserId) {
        throw new Error("Failed insert into application_user");
      }

      const [adminResult] = await connection.query<Result>(
        "INSERT INTO administrators (application_user_id) VALUES (?)",
        [applicationUserId],
      );
      if (!adminResult.insertId) {
        throw new Error("Failed insert into administrators");
      }

      await connection.commit();
      return adminResult.insertId;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT u.email, u.first_name, u.last_name
       FROM administrators a
       INNER JOIN application_user au ON a.application_user_id = au.id
       INNER JOIN user u ON au.user_id = u.id
       WHERE a.id = ?`,
      [id],
    );
    return rows[0] as User;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT u.email, u.first_name, u.last_name
       FROM administrators a
       INNER JOIN application_user au ON a.application_user_id = au.id
       INNER JOIN user u ON au.user_id = u.id`,
    );
    return rows as User[];
  }

  async update(admin: AdminData & { id: number }) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.execute<Result>(
        `UPDATE user u
        INNER JOIN application_user au ON u.id = au.user_id
        INNER JOIN administrators a ON a.application_user_id = au.id
        SET u.email = ?, u.first_name = ?, u.last_name, au.password = ?
        WHERE a.id = ?`,
        [
          admin.email,
          admin.first_name,
          admin.last_name,
          admin.password,
          admin.id,
        ],
      );

      if (result.affectedRows !== 2) {
        throw new Error("Failed to update admin");
      }

      await connection.commit();
      return true;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  async delete(id: number) {
    const [result] = await databaseClient.execute<Result>(
      `DELETE FROM user WHERE id = (
          SELECT u.id FROM user u
          INNER JOIN application_user au ON u.id = au.user_id
          INNER JOIN administrators a ON au.id = a.application_user_id
          WHERE a.id = ?)`,
      [id],
    );
    return result.affectedRows;
  }
}
export default new AdminRepository();
