import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type quizz = {
  id: number;
  name: string;
  question_id: number;
};

type createquizz = {
  name: string;
  question_id: number;
};

class quizzRepository {
  async create(quizz: Omit<createquizz, "id">) {
    const connection = await databaseClient.getConnection();
    try {
      //   await connection.beginTransaction();
      //   const [applicationUserResult] = await connection.query<Result>(
      //     "INSERT INTO application_user (password, user_id) VALUES (?, ?)",
      //     [quizz.hashed_password, quizz.user_id],
      //   );
      //   const applicationUserId = applicationUserResult.insertId;
      //   if (!applicationUserId) {
      //     throw new Error(
      //       "Failed to insert into 'user' table. Transaction rolled back.",
      //     );
      //   }
      //   const [quizzResult] = await connection.query<Result>(
      //     "INSERT INTO quizz (application_user_id, enterprise_id) VALUES (?, ?)",
      //     [applicationUserId, quizz.enterprise_id],
      //   );
      //   if (!quizzResult.insertId) {
      //     throw new Error(
      //       "Failed to insert into 'quizz' table. Transaction rolled back.",
      //     );
      //   }
      //   await connection.commit();
      //   return quizzResult.insertId;
    } catch (error) {
      //   await connection.rollback();
      //   throw error;
    } finally {
      //   connection.release();
    }
  }
  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT name, question_id, title
      FROM quizz
      INNER JOIN quizz_question ON quizz.id = quizz_question.quizz_id
        INNER JOIN question ON quizz_question.question_id = question.id
      WHERE quizz.id = ?`,
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as quizz;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "quizz" table
    const [rows] = await databaseClient.query<Rows>(`
      SELECT name, question_id
      FROM quizz
      INNER JOIN question ON quizz.question_id = question.id
      `);

    // Return the array of items
    return rows as quizz[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async update(quizz: quizz) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      const [applicationUserResult] = await connection.query<Result>(
        `
          UPDATE application_user 
          SET password = ? 
          WHERE id = (
            SELECT application_user_id 
            FROM quizz 
            WHERE id = ?
          )`,
        [quizz, quizz.id],
      );

      const applicationUserId = applicationUserResult.affectedRows > 0;

      if (!applicationUserId) {
        throw new Error(
          "Failed to insert into 'user' table. Transaction rolled back.",
        );
      }

      const [quizzResult] = await connection.query<Result>(
        `
          UPDATE user
          SET last_name = ?, first_name = ?, email = ?
          WHERE id = (
            SELECT user_id
            FROM application_user
            WHERE id = (
              SELECT application_user_id
              FROM quizz
              WHERE id = ?
            )
          )`,
        // [quizz.last_name, quizz.first_name, quizz.email, quizz.id],
      );
      if (!quizzResult.affectedRows) {
        throw new Error(
          "Failed to insert into 'quizz' table. Transaction rolled back.",
        );
      }

      await connection.commit();

      return quizzResult.insertId;
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
          FROM quizz
          WHERE id = ?
          )`,
        [id],
      );
      return result.affectedRows;
    } catch (error) {
      throw new Error(`Failed to delete with ID ${id}`);
    }
  }

  async readByEmailWithPassword(quizz: quizz) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT email, password, application_user.id
      FROM user
      WHERE email = ?
      INNER JOIN application_user ON user.id = application_user.user_id
      `,
      //   [quizz.email, quizz.hashed_password, quizz.application_user_id],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as quizz;
  }
}

export default new quizzRepository();
