import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../Modal';

describe('MapEvent Modal Component', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  const defaultProps = {
    clickItem: {},
    onSubmit: mockOnSubmit,
    onCancel: mockOnCancel,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render modal with title for new event', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('添加事件')).toBeInTheDocument();
  });

  it('should render modal with title for editing', () => {
    const editProps = {
      ...defaultProps,
      clickItem: { id: 1, type: 'gym', note: 'Test note' },
    };
    render(<Modal {...editProps} />);
    expect(screen.getByText('编辑事件')).toBeInTheDocument();
  });

  it('should render type and note fields', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByLabelText('类型')).toBeInTheDocument();
    expect(screen.getByLabelText('备注')).toBeInTheDocument();
  });

  it('should call onCancel when cancel clicked', () => {
    render(<Modal {...defaultProps} />);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should show validation errors', async () => {
    render(<Modal {...defaultProps} />);
    const okButton = screen.getByText('OK');
    fireEvent.click(okButton);

    await waitFor(() => {
      expect(screen.getByText('请选择事件类型')).toBeInTheDocument();
    });
  });

  it('should populate form with initial values', () => {
    const clickItem = { id: 1, type: 'center', note: 'Pokemon Center' };
    render(<Modal {...defaultProps} clickItem={clickItem} />);
    const noteInput = screen.getByDisplayValue('Pokemon Center');
    expect(noteInput).toBeInTheDocument();
  });
});