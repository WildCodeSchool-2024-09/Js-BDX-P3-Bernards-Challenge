import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Manager = {
  enterprise_id: number;
  application_user_id: number;
};

class ManagerRepository {
  // The C of CRUD - Create operation

  async create(manager: Omit<Manager, "id">) {
    // Execute the SQL INSERT query to add a new manager to the "manager" table
    const [result] = await databaseClient.query<Result>(
      "insert into manager (manager.application_user_id, manager.enterprise_id) values (?, ?)",
      [manager.application_user_id, manager.enterprise_id],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from manager where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Manager;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "manager" table
    const [rows] = await databaseClient.query<Rows>("select * from manager");

    // Return the array of items
    return rows as Manager[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(manager : Manager) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new ManagerRepository();
