import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { AllocationsManager } from '../AllocationsManager';

const allocations = {
  person1: [{ from: 1, to: 28, value: 224 }],
  person2: [{ from: 1, to: 28, value: 140 }],
  person3: [{ from: 1, to: 28, value: 280 }],
};

describe('1.', () => {
  test('renders components and current view toggle correctly', () => {
    render(<AllocationsManager initialAllocations={allocations} />);

    expect(screen.getByText('People')).toBeInTheDocument();

    const dayViewButton = screen.getByTestId('day-view');
    const weekViewButton = screen.getByTestId('week-view');
    const monthViewButton = screen.getByTestId('month-view');

    expect(dayViewButton).toBeInTheDocument();
    expect(weekViewButton).toBeInTheDocument();
    expect(monthViewButton).toBeInTheDocument();

    expect(screen.getByTestId('current-view')).toHaveTextContent('Week 2');

    userEvent.click(dayViewButton);
    expect(screen.getByTestId('current-view')).toHaveTextContent('8');

    userEvent.click(monthViewButton);
    expect(screen.queryByTestId('current-view')).not.toBeInTheDocument();

    userEvent.click(weekViewButton);
    expect(screen.getByTestId('current-view')).toHaveTextContent('Week 1');
  });

  test('update allocation in week view, month view should get updated', async () => {
    render(<AllocationsManager initialAllocations={allocations} />);

    const allocationCell = screen.getByTestId('person1-date-10-allocation-value');
    userEvent.click(allocationCell);

    const allocationInput = screen.getByTestId('allocation-input');
    await userEvent.type(allocationInput, '{backspace}12');
    userEvent.click(screen.getByTestId('allocation-popup-save'));

    expect(allocationCell).toHaveTextContent('12 hours');

    userEvent.click(screen.getByTestId('month-view'));

    const monthAllocationCell = screen.getByTestId('person1-date-8-14-allocation-value');
    expect(monthAllocationCell).toHaveTextContent('60 hours');

    expect(screen.getByTestId('person1-date-1-7-allocation-value')).toHaveTextContent('56 hours');
  });
});
