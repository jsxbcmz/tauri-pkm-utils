import { readTextFile, writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";

const FILE_PATHNAME_MAP = {
  1: "commonData/raidPokemon.json",
  2: "commonData/history.json",
  3: "commonData/mapEvent.json",
};

// 添加缓存机制，减少重复文件读取
const fileCache = new Map();

const fsUtils = {
  // 读取JSON文件，带缓存和错误处理
  readJson: async (type, callback) => {
    try {
      const pathname = FILE_PATHNAME_MAP[type];
      if (!pathname) {
        throw new Error(`Unknown file type: ${type}`);
      }

      // 检查缓存
      if (fileCache.has(pathname)) {
        callback(fileCache.get(pathname));
        return;
      }

      const contents = await readTextFile(pathname, {
        dir: BaseDirectory.Resource,
      });

      const parsedData = JSON.parse(contents);
      
      // 缓存数据
      fileCache.set(pathname, parsedData);
      
      if (callback && typeof callback === 'function') {
        callback(parsedData);
      }
    } catch (error) {
      console.error(`Error reading file (type: ${type}):`, error);
      throw error;
    }
  },

  // 写入JSON文件，带错误处理
  writeJson: async (type, data) => {
    try {
      const pathname = FILE_PATHNAME_MAP[type];
      if (!pathname) {
        throw new Error(`Unknown file type: ${type}`);
      }

      const jsonData = JSON.stringify(data, null, 2);
      await writeTextFile(pathname, jsonData, {
        dir: BaseDirectory.Resource,
      });

      // 更新缓存
      fileCache.set(pathname, data);
    } catch (error) {
      console.error(`Error writing file (type: ${type}):`, error);
      throw error;
    }
  },

  // 清除特定文件的缓存
  clearCache: (type) => {
    const pathname = FILE_PATHNAME_MAP[type];
    if (pathname) {
      fileCache.delete(pathname);
    }
  },

  // 清除所有缓存
  clearAllCache: () => {
    fileCache.clear();
  },

  // 读取文件但不使用缓存
  readJsonNoCache: async (type, callback) => {
    try {
      const pathname = FILE_PATHNAME_MAP[type];
      if (!pathname) {
        throw new Error(`Unknown file type: ${type}`);
      }

      // 清除缓存后再读取
      fileCache.delete(pathname);

      const contents = await readTextFile(pathname, {
        dir: BaseDirectory.Resource,
      });

      const parsedData = JSON.parse(contents);
      fileCache.set(pathname, parsedData); // 读取后重新缓存
      
      if (callback && typeof callback === 'function') {
        callback(parsedData);
      }
    } catch (error) {
      console.error(`Error reading file without cache (type: ${type}):`, error);
      throw error;
    }
  }
};

export default fsUtils;
