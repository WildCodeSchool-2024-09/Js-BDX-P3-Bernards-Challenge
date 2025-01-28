import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Quizz = {
  id: number;
  name: string;
  questions: Question[];
};

type Question = {
  id: number;
  title: string;
  fields: Fields[];
};

type Fields = {
  id: number;
  content: string;
  status?: boolean;
  questionId: Question["id"];
};

class quizzRepository {
  async create(quizz: Omit<Quizz, "id">) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();
      const [quizzResult] = await connection.execute<Result>(
        "INSERT INTO quizz (name) VALUES (?)",
        [quizz.name],
      );
      const quizzId = quizzResult.insertId;
      if (!quizzId) {
        throw new Error(
          "Failed to insert into 'quizz' table. Transaction rolled back.",
        );
      }

      quizz.questions.map(async (question) => {
        const [questionResult] = await connection.execute<Result>(
          `
              INSERT INTO question (title, quizz_id)
              VALUES (?, ?)
            `,
          [question.title, quizzId],
        );

        const questionId = questionResult.insertId;

        if (!questionId) {
          throw new Error("Failed insert into question table");
        }

        if (question.fields) {
          question.fields.map(async (field) => {
            const [fieldResult] = await connection.execute<Result>(
              `
                INSERT INTO fields (content, question_id, status)
                VALUES (?, ?, ?)
                `,
              [field.content, questionId, field.status],
            );

            if (!fieldResult.insertId) {
              throw new Error("Failed insert into field");
            }
          });
        }
      });
      await connection.commit();
      return quizzId;
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
    const [rows] = await databaseClient.execute<Rows>(
      `
        SELECT 
    quizz.id AS quizzId, 
    name,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', question.id, 
            'title', title,
            'fields', JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', fields.id,
                    'content', content,
                    'status', status
                )
            )
        )
    ) AS questions
FROM quizz
INNER JOIN question ON question.quizz_id = quizz.id
INNER JOIN fields ON fields.question_id = question.id
WHERE quizz.id = ?
GROUP BY quizz.id, quizz.name
      `,
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Quizz;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "quizz" table
    const [rows] = await databaseClient.query<Rows>(`
      SELECT 
    quizz.id AS quizzId, 
    name,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', question.id, 
            'title', title,
            'fields', JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', fields.id,
                    'content', content,
                    'status', status
                )
            )
        )
    ) AS questions
FROM quizz
INNER JOIN question ON question.quizz_id = quizz.id
INNER JOIN fields ON fields.question_id = question.id
GROUP BY quizz.id, quizz.name
      `);

    // Return the array of items
    return rows as Quizz[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async update(quizz: Quizz) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      const [quizzUpdateResult] = await connection.execute<Result>(
        `
      UPDATE quizz 
      SET name = ? 
      WHERE id = ?
      `,
        [quizz.name, quizz.id],
      );
      if (!quizzUpdateResult.affectedRows) {
        throw new Error(`Failed to update quizz with ID ${quizz.id}`);
      }

      const [existingQuestions] = await connection.execute<Rows>(
        `
      SELECT id 
      FROM question 
      WHERE quizz_id = ?
      `,
        [quizz.id],
      );
      const existingQuestionIds = existingQuestions.map(
        (question) => question.id,
      );

      const incomingQuestionIds: Question["id"][] = [];
      for (const question of quizz.questions) {
        const [questionResult] = await connection.execute<Result>(
          `
        INSERT INTO question (id, title, quizz_id)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE title = VALUES(title)
        `,
          [question.id || null, question.title, quizz.id],
        );

        const questionId = question.id || questionResult.insertId;
        if (!questionId) {
          throw new Error(
            `Failed to insert or update question: ${question.title}`,
          );
        }
        incomingQuestionIds.push(questionId);

        if (question.fields) {
          const [existingFields] = await connection.execute<Rows>(
            `
          SELECT id 
          FROM fields 
          WHERE question_id = ?
          `,
            [questionId],
          );
          const existingFieldIds = existingFields.map((field) => field.id);

          const incomingFieldIds: Fields["id"][] = [];
          for (const field of question.fields) {
            const [fieldResult] = await connection.execute<Result>(
              `
            INSERT INTO fields (id, content, question_id, status)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE content = VALUES(content), status = VALUES(status)
            `,
              [field.id || null, field.content, questionId, field.status],
            );

            const fieldId = field.id || fieldResult.insertId;
            if (!fieldId) {
              throw new Error(
                `Failed to insert or update field: ${field.content}`,
              );
            }
            incomingFieldIds.push(fieldId);
          }

          const fieldsToDelete = existingFieldIds.filter(
            (id) => !incomingFieldIds.includes(id),
          );
          if (fieldsToDelete.length > 0) {
            const [deleteResult] = await connection.execute<Result>(
              `
            DELETE FROM fields 
            WHERE id IN (?)
            `,
              [fieldsToDelete],
            );
            if (deleteResult.affectedRows !== fieldsToDelete.length) {
              throw new Error(
                `Failed to delete some fields: ${fieldsToDelete.join(", ")}`,
              );
            }
          }
        }
      }

      const questionsToDelete = existingQuestionIds.filter(
        (id) => !incomingQuestionIds.includes(id),
      );
      if (questionsToDelete.length > 0) {
        const [deleteResult] = await connection.execute<Result>(
          `
        DELETE FROM question 
        WHERE id IN (?)
        `,
          [questionsToDelete],
        );
        if (deleteResult.affectedRows !== questionsToDelete.length) {
          throw new Error(
            `Failed to delete some questions: ${questionsToDelete.join(", ")}`,
          );
        }
      }

      await connection.commit();
      return quizz.id;
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
    const [result] = await databaseClient.execute<Result>(
      `
      DELETE FROM quizz 
        WHERE id = ?
          )`,
      [id],
    );
    return result.affectedRows;
  }
}

export default new quizzRepository();
