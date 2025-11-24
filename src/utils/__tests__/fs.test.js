import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import fsUtils from '../fs';

vi.mock('@tauri-apps/api/fs');

describe('fsUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fsUtils.clearAllCache();
  });

  afterEach(() => {
    fsUtils.clearAllCache();
  });

  describe('readJson', () => {
    it('should read JSON file successfully', async () => {
      const mockData = { name: 'test', value: 123 };
      readTextFile.mockResolvedValue(JSON.stringify(mockData));

      const callback = vi.fn();
      await fsUtils.readJson('1', callback);

      expect(readTextFile).toHaveBeenCalledWith(
        'commonData/raidPokemon.json',
        expect.any(Object)
      );
      expect(callback).toHaveBeenCalledWith(mockData);
    });

    it('should use cached data on second read', async () => {
      const mockData = { name: 'cached', value: 456 };
      readTextFile.mockResolvedValue(JSON.stringify(mockData));

      const callback1 = vi.fn();
      const callback2 = vi.fn();

      await fsUtils.readJson('1', callback1);
      await fsUtils.readJson('1', callback2);

      expect(readTextFile).toHaveBeenCalledTimes(1);
      expect(callback1).toHaveBeenCalledWith(mockData);
      expect(callback2).toHaveBeenCalledWith(mockData);
    });

    it('should handle different file types', async () => {
      const mockData = { events: [] };
      readTextFile.mockResolvedValue(JSON.stringify(mockData));

      const callback = vi.fn();
      await fsUtils.readJson('3', callback);

      expect(readTextFile).toHaveBeenCalledWith(
        'commonData/mapEvent.json',
        expect.any(Object)
      );
    });

    it('should throw error for unknown file type', async () => {
      await expect(fsUtils.readJson('999', vi.fn())).rejects.toThrow('Unknown file type: 999');
    });

    it('should handle read errors', async () => {
      readTextFile.mockRejectedValue(new Error('File not found'));
      await expect(fsUtils.readJson('1', vi.fn())).rejects.toThrow('File not found');
    });

    it('should handle invalid JSON', async () => {
      readTextFile.mockResolvedValue('invalid json {');
      await expect(fsUtils.readJson('1', vi.fn())).rejects.toThrow();
    });
  });

  describe('writeJson', () => {
    it('should write JSON file successfully', async () => {
      const mockData = { name: 'write test', value: 789 };
      writeTextFile.mockResolvedValue();

      await fsUtils.writeJson('1', mockData);

      expect(writeTextFile).toHaveBeenCalledWith(
        'commonData/raidPokemon.json',
        JSON.stringify(mockData, null, 2),
        expect.any(Object)
      );
    });

    it('should update cache after write', async () => {
      const mockData = { updated: true };
      writeTextFile.mockResolvedValue();

      await fsUtils.writeJson('1', mockData);

      const callback = vi.fn();
      await fsUtils.readJson('1', callback);

      expect(callback).toHaveBeenCalledWith(mockData);
      expect(readTextFile).toHaveBeenCalledTimes(0);
    });

    it('should throw error for unknown file type', async () => {
      await expect(fsUtils.writeJson('invalid', {})).rejects.toThrow('Unknown file type: invalid');
    });
  });

  describe('clearCache', () => {
    it('should clear specific file cache', async () => {
      const mockData = { cached: true };
      readTextFile.mockResolvedValue(JSON.stringify(mockData));

      await fsUtils.readJson('1', vi.fn());
      fsUtils.clearCache('1');
      await fsUtils.readJson('1', vi.fn());

      expect(readTextFile).toHaveBeenCalledTimes(2);
    });
  });

  describe('clearAllCache', () => {
    it('should clear all cached files', async () => {
      readTextFile.mockResolvedValue(JSON.stringify({ data: 'test' }));

      await fsUtils.readJson('1', vi.fn());
      await fsUtils.readJson('2', vi.fn());

      fsUtils.clearAllCache();

      await fsUtils.readJson('1', vi.fn());
      await fsUtils.readJson('2', vi.fn());

      expect(readTextFile).toHaveBeenCalledTimes(4);
    });
  });

  describe('readJsonNoCache', () => {
    it('should always read from file', async () => {
      const mockData1 = { version: 1 };
      const mockData2 = { version: 2 };
      
      readTextFile
        .mockResolvedValueOnce(JSON.stringify(mockData1))
        .mockResolvedValueOnce(JSON.stringify(mockData2));

      const callback1 = vi.fn();
      const callback2 = vi.fn();

      await fsUtils.readJsonNoCache('1', callback1);
      await fsUtils.readJsonNoCache('1', callback2);

      expect(readTextFile).toHaveBeenCalledTimes(2);
      expect(callback1).toHaveBeenCalledWith(mockData1);
      expect(callback2).toHaveBeenCalledWith(mockData2);
    });
  });

  describe('edge cases', () => {
    it('should handle empty data', async () => {
      writeTextFile.mockResolvedValue();
      await expect(fsUtils.writeJson('1', null)).resolves.not.toThrow();
      await expect(fsUtils.writeJson('1', [])).resolves.not.toThrow();
      await expect(fsUtils.writeJson('1', {})).resolves.not.toThrow();
    });

    it('should handle concurrent reads', async () => {
      readTextFile.mockImplementation(() => 
        new Promise(resolve => 
          setTimeout(() => resolve(JSON.stringify({ concurrent: true })), 10)
        )
      );

      const callbacks = [vi.fn(), vi.fn(), vi.fn()];
      await Promise.all(callbacks.map(cb => fsUtils.readJson('1', cb)));

      callbacks.forEach(cb => {
        expect(cb).toHaveBeenCalledWith({ concurrent: true });
      });
    });
  });
});