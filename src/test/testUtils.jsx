import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

export function renderWithRouter(ui, options = {}) {
  const Wrapper = ({ children }) => (
    <BrowserRouter>{children}</BrowserRouter>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}

export const mockPokemonList = [
  { id: 1, name: '皮卡丘', moves: ['电', '一般'], special: '注意雷电攻击' },
  { id: 2, name: '妙蛙种子', moves: ['草', '毒'], special: '草系强力' },
];

export const mockEvents = [
  { id: 1, x: 100, y: 200, activeKey: 'paldea', type: 'gym', note: '道馆1' },
  { id: 2, x: 300, y: 400, activeKey: 'kitakami', type: 'center', note: '中心' },
];

export const mockHistory = [
  { id: 1, type: '水', name: '杰尼龟', success: true, notice: '成功击败' },
  { id: 2, type: '火', name: '小火龙', success: false, notice: '需要更强' },
];