import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

vi.mock('../nav', () => ({
  default: [
    { path: '/raid', title: '团战', component: () => <div>Raid Page</div> },
    { path: '/map', title: '地图', component: () => <div>Map Page</div> },
  ],
}));

describe('App Component', () => {
  it('should render without crashing', () => {
    render(<App />);
    expect(document.querySelector('.ant-layout')).toBeInTheDocument();
  });

  it('should render navigation menu', () => {
    render(<App />);
    expect(screen.getByText('团战')).toBeInTheDocument();
    expect(screen.getByText('地图')).toBeInTheDocument();
  });

  it('should render with Layout structure', () => {
    render(<App />);
    const sider = document.querySelector('.ant-layout-sider');
    const content = document.querySelector('.ant-layout-content');
    expect(sider).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('should render default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Raid Page')).toBeInTheDocument();
  });
});