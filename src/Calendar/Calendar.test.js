import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calendar } from './Calendar';

// Mock dependencies
jest.mock('moment', () => {
  const actualMoment = jest.requireActual('moment');
  return (...args) => actualMoment(...args);
});

const mockOnPrev = jest.fn();
const mockOnNext = jest.fn();
const mockOnDateChange = jest.fn();
const mockGetCellProps = jest.fn(() => ({}));

const defaultProps = {
  month: '01',
  year: '2024',
  onPrev: mockOnPrev,
  onNext: mockOnNext,
  onDateChange: mockOnDateChange,
  getCellProps: mockGetCellProps,
};

describe('Calendar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders calendar controls and table', () => {
    render(<Calendar {...defaultProps} />);
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(3); // Today, Prev, Next
    expect(screen.getAllByRole('option').length).toBeGreaterThan(0); // Month/year options
    // Check days of the week
    ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it('calls onPrev when left arrow is clicked', () => {
    render(<Calendar {...defaultProps} />);
    const leftButton = screen.getAllByRole('button')[1];
    fireEvent.click(leftButton);
    expect(mockOnPrev).toHaveBeenCalled();
  });

  it('calls onNext when right arrow is clicked', () => {
    render(<Calendar {...defaultProps} />);
    const rightButton = screen.getAllByRole('button')[3] || screen.getAllByRole('button')[2];
    fireEvent.click(rightButton);
    expect(mockOnNext).toHaveBeenCalled();
  });

  it('calls onDateChange when Today is clicked', () => {
    render(<Calendar {...defaultProps} />);
    const todayButton = screen.getByText('Today');
    fireEvent.click(todayButton);
    expect(mockOnDateChange).toHaveBeenCalled();
  });

  it('calls onDateChange when month is changed', () => {
    render(<Calendar {...defaultProps} />);
    const monthSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(monthSelect, { target: { value: 'February' } });
    expect(mockOnDateChange).toHaveBeenCalledWith('February');
  });

  it('calls onDateChange when year is changed', () => {
    render(<Calendar {...defaultProps} />);
    const yearSelect = screen.getAllByRole('combobox')[1];
    fireEvent.change(yearSelect, { target: { value: '2025' } });
    expect(mockOnDateChange).toHaveBeenCalledWith('2025');
  });
});