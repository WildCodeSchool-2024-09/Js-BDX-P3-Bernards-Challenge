import { application } from "express";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Admin = {
  id: number;
  application_user_id: number;
};

class AdminRepository {
  
  async create(admin: Omit<Admin, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO admin (application_user_id) VALUES (?)",
      [admin.application_user_id],
    );
    return result.insertId;
  }

  
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      
    `SELECT last_name, first_name, email
      FROM users
      INNER JOIN application_user on application_user.user_id= user.id
      INNER JOIN administrators on administrators.application_user_id= application_user.id
      WHERE administrators.id = ?
      `,[id],
    );
    return rows[0] as Admin;
  }

  
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT last_name, first_name, email
      FROM users
      INNER JOIN application_user on application_user.user_id= user.id
      INNER JOIN administrators on administrators.application_user_id= application_user.id`);
    return rows as Admin[];
  }

  
  async update(admin: Admin) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE admin SET application_user_id = ? WHERE id = ?",
      [admin.application_user_id, admin.id],
    );
    return result.affectedRows > 0; 
  }

  
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      `DELETE FROM user 
      WHERE id = (
        SELECT user_id
        FROM application_user
        WHERE id=(
          SELECT application_user_id
          FROM administrator
          WHERE id= ? 
        )
      )    
      `,
      [id],
    );
    return result.affectedRows; 
  }
}

export default new AdminRepository();
