import fs from "fs/promises";

const options = {
  encoding: "utf-8",
};

const readFile = async (path) => {
  return await fs.readFile(path, options);
};

const updateFile = async (path, data) => {
  const parsedData = JSON.stringify(data);

  return await fs.writeFile(path, parsedData, options);
};

export { readFile, updateFile };
