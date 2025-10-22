import pool from "../config/db";

export const fileUpload = async (filePath: string) => {
  try {
    await pool.query(`call insert_file($1)`, [filePath]);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 500,
        message: "Failed to store file path in DB",
      },
    };
  }
};
