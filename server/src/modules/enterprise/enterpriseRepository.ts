import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Enterprise = {
  id: number;
  name: string;
  token_slack: string;
};

class EnterpriseRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM enterprise");
    return rows;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM enterprise WHERE id = ?", [id]);
    return rows[0];
  }

  async create(enterprise: Omit<Enterprise, "id">) {
    const { name, token_slack } = enterprise;

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO enterprise (name, token_slack) VALUES (?, ?)",
      [name, token_slack]
    );

    const enterpriseId = result.insertId;

    return enterpriseId;
  }

  async update(enterprise: Enterprise) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE enterprise 
       SET name = ?, token_slack = ? 
       WHERE id = ?`,
      [enterprise.name, enterprise.token_slack, enterprise.id]
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      const [deleteChannelsResult] = await connection.query<Result>(
        "DELETE FROM channel_slack WHERE entreprise_id = ?",
        [id]
      );
      if (deleteChannelsResult.affectedRows === 0) {
        throw new Error(`Aucune ligne supprimée pour les channels Slack de l'entreprise avec l'ID ${id}`);
      }

      const [deleteEnterpriseResult] = await connection.query<Result>(
        "DELETE FROM enterprise WHERE id = ?",
        [id]
      );
      if (deleteEnterpriseResult.affectedRows === 0) {
        throw new Error(`Aucune ligne supprimée pour l'entreprise avec l'ID ${id}`);
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default new EnterpriseRepository();