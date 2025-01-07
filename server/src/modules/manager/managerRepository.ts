import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Manager = {
  id: number;
  last_name: string;
  first_name: string;
  email: string;
  password: string;
  entreprise_id: number;
};

class ManagerRepository {
  // The C of CRUD - Create operation

  async create(manager: Omit<Manager, "id">) {
    // Execute the SQL INSERT query to add a new manager to the "manager" table
    const [result] = await databaseClient.query<Result>(
      "insert into manager (application_user_id, enterprise_id) values (?, ?)",
      // [manager.application_user_id, manager.enterprise_id],
    );
    // transaction.commit();
    // rollback();
    // Return the ID of the newly inserted item
    return result.insertId;
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
      WHERE id = ?`,
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

  async update(manager: Manager) {}

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from manager where id = ?",
      [id],
    );
  }
}

export default new ManagerRepository();
