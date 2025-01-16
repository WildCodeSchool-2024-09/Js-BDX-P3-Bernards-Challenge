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
        "INSERT INTO user (mail, first_name) VALUES (?, ?)",
        [adminData.email, adminData.first_name]
      );

      const userId = userResult.insertId;

      const [appUserResult] = await connection.query<Result>(
        "INSERT INTO application_user (password, user_id) VALUES (?, ?)",
        [adminData.password, userId]
      );

      const applicationUserId = appUserResult.insertId;

      const [adminResult] = await connection.query<Result>(
        "INSERT INTO administrateur (application_user_id) VALUES (?)",
        [applicationUserId]
      );

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
      `SELECT u.mail, u.first_name, au.password
       FROM administrateur a
       INNER JOIN application_user au ON a.application_user_id = au.id
       INNER JOIN user u ON au.user_id = u.id
       WHERE a.id = ?`,
      [id]
    );
    return rows[0] as User;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT u.mail, u.first_name, au.password
       FROM administrateur a
       INNER JOIN application_user au ON a.application_user_id = au.id
       INNER JOIN user u ON au.user_id = u.id`
    );
    return rows as User[];
  }

  async update(admin: AdminData & { id: number }) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      await connection.query(
        `UPDATE user u
        INNER JOIN application_user au ON u.id = au.user_id
        INNER JOIN administrateur a ON a.application_user_id = au.id
        SET u.mail = ?, u.first_name = ?, au.password = ?
        WHERE a.id = ?`,
        [admin.email, admin.first_name, admin.password, admin.id]
      );

      await connection.commit();
      return true;
    } catch (err) {
      await connection.rollback();
      return false;
    } finally {
      connection.release();
    }
  }

  async delete(id: number) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      await connection.query(
        `DELETE FROM user WHERE id = (
          SELECT u.id FROM user u
          INNER JOIN application_user au ON u.id = au.user_id
          INNER JOIN administrateur a ON au.id = a.application_user_id
          WHERE a.id = ?)`,
        [id]
      );

      await connection.commit();
      return true;
    } catch (err) {
      await connection.rollback();
      return false;
    } finally {
      connection.release();
    }
  }
}

export default new AdminRepository();
