import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Calendar } from '../src/Calendar/Calendar';
import moment from 'moment';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

jest.mock('react-icons/fa', () => ({
    FaArrowLeft: () => <div>Left Arrow</div>,
    FaArrowRight: () => <div>Right Arrow</div>,
}));

describe('Calendar Component', () => {
    const mockOnPrev = jest.fn();
    const mockOnNext = jest.fn();
    const mockOnDateChange = jest.fn();
    const mockGetCellProps = jest.fn();

    const month = moment().month().format('MMMM');
    const year = moment().year();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with initial props', () => {
        const { getByText, getByRole } = render(
            <Calendar 
                month={month} 
                year={year} 
                onPrev={mockOnPrev} 
                onNext={mockOnNext} 
                onDateChange={mockOnDateChange} 
                getCellProps={mockGetCellProps} 
            />
        );

        expect(getByText('Today')).toBeInTheDocument();
        expect(getByRole('button', { name: /Previous Month/i })).toBeInTheDocument();
        expect(getByRole('button', { name: /Next Month/i })).toBeInTheDocument();
    });

    it('calls onDateChange when the month is changed', () => {
        const { getByRole } = render(
            <Calendar 
                month={month} 
                year={year} 
                onPrev={mockOnPrev} 
                onNext={mockOnNext} 
                onDateChange={mockOnDateChange} 
                getCellProps={mockGetCellProps} 
            />
        );

        const monthSelect = getByRole('combobox', { name: /month/i });
        fireEvent.change(monthSelect, { target: { value: 'January' } });

        expect(mockOnDateChange).toHaveBeenCalledWith('January');
    });

    it('calls onDateChange when the year is changed', () => {
        const { getByRole } = render(
            <Calendar 
                month={month} 
                year={year} 
                onPrev={mockOnPrev} 
                onNext={mockOnNext} 
                onDateChange={mockOnDateChange} 
                getCellProps={mockGetCellProps} 
            />
        );

        const yearSelect = getByRole('combobox', { name: /year/i });
        fireEvent.change(yearSelect, { target: { value: '2023' } });

        expect(mockOnDateChange).toHaveBeenCalledWith('2023');
    });

    it('calls onToday when Today button is clicked', () => {
        const { getByText } = render(
            <Calendar 
                month={month} 
                year={year} 
                onPrev={mockOnPrev} 
                onNext={mockOnNext} 
                onDateChange={mockOnDateChange} 
                getCellProps={mockGetCellProps} 
            />
        );

        const todayButton = getByText('Today');
        fireEvent.click(todayButton);

        expect(mockOnDateChange).toHaveBeenCalled();
    });

    it('calls onPrev when Previous Month button is clicked', () => {
        const { getByRole } = render(
            <Calendar 
                month={month} 
                year={year} 
                onPrev={mockOnPrev} 
                onNext={mockOnNext} 
                onDateChange={mockOnDateChange} 
                getCellProps={mockGetCellProps} 
            />
        );

        const prevButton = getByRole('button', { name: /Previous Month/i });
        fireEvent.click(prevButton);

        expect(mockOnPrev).toHaveBeenCalled();
    });

    it('calls onNext when Next Month button is clicked', () => {
        const { getByRole } = render(
            <Calendar 
                month={month} 
                year={year} 
                onPrev={mockOnPrev} 
                onNext={mockOnNext} 
                onDateChange={mockOnDateChange} 
                getCellProps={mockGetCellProps} 
            />
        );

        const nextButton = getByRole('button', { name: /Next Month/i });
        fireEvent.click(nextButton);

        expect(mockOnNext).toHaveBeenCalled();
    });

    it('renders the correct number of days in the calendar', () => {
        const { getByText } = render(
            <Calendar 
                month={month} 
                year={year} 
                onPrev={mockOnPrev} 
                onNext={mockOnNext} 
                onDateChange={mockOnDateChange} 
                getCellProps={mockGetCellProps} 
            />
        );

        const daysInMonth = moment(`${month} ${year}`, 'MMMM YYYY').daysInMonth();
        for (let day = 1; day <= daysInMonth; day++) {
            expect(getByText(day.toString())).toBeInTheDocument();
        }
    });
});