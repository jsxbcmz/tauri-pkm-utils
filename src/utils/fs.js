import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';

const FILE_PATHNAME_MAP = {
  '1':'commonData/raidPokemon.json',
  '2':'commonData/history.json',
  '3':'commonData/mapEvent.json',
}
 
 const fsUtils = {
   readJson: async (type,callback) => {
     const pathname = FILE_PATHNAME_MAP[type] || 'commonData/raidPokemon.json';
  
    const contents = await readTextFile(pathname, { dir: BaseDirectory.Resource });
    callback(JSON.parse(contents));
   },

   writeJson: async (type, data, callback) => {
    const pathname = FILE_PATHNAME_MAP[type] || 'commonData/raidPokemon.json';

    await writeTextFile(pathname,JSON.stringify(data), { dir: BaseDirectory.Resource });
    callback();
   },
 };
 
 export default fsUtils;
 