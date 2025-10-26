import pool from "../config/db";

export const fileUpload = async (
  filePath: string,
  file_type: string,
  file_name: string
) => {
  try {
    await pool.query(`call insert_file($1,$2,$3)`, [
      filePath,
      file_type,
      file_name,
    ]);
    return {
      success: true,
    };
  } catch (error) {
    console.log("Failed to upload file", error);
    return {
      success: false,
      error: {
        code: 500,
        message: "Failed to store file path in DB",
      },
    };
  }
};

export const getFiles = async (limit?: number, offset?: number) => {
  try {
    const result = await pool.query(`select get_files($1,$2)as files`, [
      limit ?? 10,
      offset ?? 0,
    ]);
    const dataFromDB = result.rows[0].files;

    // const data = dataFromDB.map((d: any) => {
    //   const file_url = `http://localhost:5000/${d.file_path}`;
    //   return {
    //     id: d.id,
    //     file_name: d.file_name,
    //     file_type: d.file_type,
    //     file_url: file_url,
    //     date_time: d.date_time,
    //   };
    // });
    return {
      success: true,
      data: dataFromDB,
    };
  } catch (error) {
    console.log("Failed to get files", error);
    return {
      success: false,
      error: {
        code: 500,
        message: "Failed to get files",
      },
    };
  }
};

export const getFileDownload = async (id: number) => {
  try {
    const res = await pool.query(
      `select file_path,file_name from files where id=${id}`
    );
    if (res.rows.length === 0) {
      return { success: false, message: "File not found" };
    }
    const file_path = res.rows[0].file_path;
    const file_name = res.rows[0].file_name;

    return {
      success: true,
      data: { file_path, file_name },
    };
  } catch (error) {
    console.log("Failed to get file path", error);
    return {
      success: false,
      error: {
        code: 500,
        message: "Failed to get file path",
      },
    };
  }
};
