import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { AllocationsManager } from '../AllocationsManager';

describe('1.', () => {
  const allocations = {
    person1: [{ from: 1, to: 28, value: 224 }],
    person2: [
      { from: 1, to: 9, value: 45 },
      { from: 10, to: 10, value: 12 },
      { from: 11, to: 28, value: 90 },
    ],
    person3: [{ from: 1, to: 28, value: 280 }],
  };

  test('1.1', () => {
    render(<AllocationsManager initialAllocations={allocations} />);

    expect(screen.getByText('People')).toBeInTheDocument();

    expect(screen.getByText('person1')).toBeInTheDocument();
    expect(screen.getByText('person2')).toBeInTheDocument();
    expect(screen.getByText('person3')).toBeInTheDocument();

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

  test('1.2', async () => {
    render(<AllocationsManager initialAllocations={allocations} />);

    const allocationCell = screen.getByTestId('person2-date-10-allocation-value');
    userEvent.click(allocationCell);

    const allocationInput = screen.getByTestId('allocation-input');
    await userEvent.type(allocationInput, '{backspace}10');
    userEvent.click(screen.getByTestId('allocation-popup-save'));

    expect(allocationCell).toHaveTextContent('10 hours');

    userEvent.click(screen.getByTestId('month-view'));

    const monthAllocationCell = screen.getByTestId('person2-date-8-14-allocation-value');
    expect(monthAllocationCell).toHaveTextContent('40 hours');
  });
});

describe('2.', () => {
  const allocations = {
    person1: [{ from: 1, to: 28, value: 224 }],
    person2: [
      { from: 1, to: 9, value: 45 },
      { from: 10, to: 10, value: 12 },
      { from: 11, to: 28, value: 90 },
    ],
    person3: [{ from: 1, to: 28, value: 280 }],
  };

  test('2.1', () => {
    render(<AllocationsManager initialAllocations={allocations} />);

    expect(screen.getByTestId('person1-date-10-allocation-value')).toHaveTextContent('8 hours');
    expect(screen.getByTestId('person2-date-9-allocation-value')).toHaveTextContent('5 hours');
    expect(screen.getByTestId('person2-date-10-allocation-value')).toHaveTextContent('12 hours');
    expect(screen.getByTestId('person3-date-10-allocation-value')).toHaveTextContent('10 hours');
  });

  test('2.2', async () => {
    render(<AllocationsManager initialAllocations={allocations} />);

    const allocationCell = screen.getByTestId('person2-date-10-allocation-value');
    userEvent.click(allocationCell);

    const allocationInput = screen.getByTestId('allocation-input');
    await userEvent.type(allocationInput, '{backspace}10');
    userEvent.click(screen.getByTestId('allocation-popup-save'));

    expect(allocationCell).toHaveTextContent('10 hours');

    userEvent.click(screen.getByTestId('month-view'));

    const monthAllocationCell = screen.getByTestId('person2-date-8-14-allocation-value');
    expect(monthAllocationCell).toHaveTextContent('40 hours');
  });

  test('2.3', async () => {
    render(<AllocationsManager initialAllocations={allocations} />);

    const allocationCell = screen.getByTestId('person2-date-10-allocation-value');
    userEvent.click(allocationCell);

    const allocationInput = screen.getByTestId('allocation-input');
    expect(screen.getByTestId('allocation-input').value).toEqual('12');
    await userEvent.type(allocationInput, '{backspace}{backspace}10');
    userEvent.click(screen.getByTestId('allocation-popup-save'));

    expect(allocationCell).toHaveTextContent('10 hours');

    userEvent.click(allocationCell);
    expect(screen.getByTestId('allocation-input').value).toEqual('10');
  });
});

describe('3.', () => {
  const allocations = {
    person1: [
      { from: 1, to: 9, value: 72 },
      { from: 10, to: 10, value: 12 },
      { from: 11, to: 28, value: 144 },
    ],
    person2: [
      { from: 1, to: 12, value: 60 },
      { from: 13, to: 13, value: 2 },
      { from: 14, to: 28, value: 75 },
    ],
    person3: [
      { from: 1, to: 25, value: 250 },
      { from: 26, to: 26, value: 14 },
      { from: 27, to: 28, value: 20 },
    ],
  };

  test('3.1', async () => {
    render(<AllocationsManager initialAllocations={allocations} />);

    expect(screen.getByTestId('person2-date-10-allocation-value')).toHaveTextContent('5 hours');

    userEvent.click(screen.getByTestId('person2-date-10-allocation-value'));
    const allocationInput = screen.getByTestId('allocation-input');
    await userEvent.type(allocationInput, '{backspace}10');
    userEvent.click(screen.getByTestId('allocation-popup-save'));

    expect(screen.getByTestId('person2-date-10-allocation-value')).toHaveTextContent('10 hours');

    userEvent.click(screen.getByTestId('month-view'));

    expect(screen.getByTestId('person2-date-8-14-allocation-value')).toHaveTextContent('37 hours');

    userEvent.click(screen.getByTestId('week-view'));

    // confirm it jumped to day 1-7
    screen.getByTestId('person2-date-1-allocation-value');

    userEvent.click(screen.getByTestId('next-view'));

    // confirm day 8 is visible
    screen.getByTestId('person2-date-8-allocation-value');

    userEvent.click(screen.getByTestId('day-view'));

    userEvent.click(screen.getByTestId('next-view'));
    userEvent.click(screen.getByTestId('next-view'));

    expect(screen.getByTestId('person2-date-10-allocation-value')).toHaveTextContent('10 hours');
  });

  test('3.2', async () => {
    render(<AllocationsManager initialAllocations={allocations} />);

    // confirm day 8 is visible
    screen.getByTestId('person2-date-10-allocation-value');

    userEvent.click(screen.getByTestId('prev-view'));

    // confirm it jumped to day 1-7
    screen.getByTestId('person2-date-1-allocation-value');

    userEvent.click(screen.getByTestId('day-view'));

    // confirm day 1 is visible
    screen.getByTestId('person2-date-1-allocation-value');

    userEvent.click(screen.getByTestId('prev-view'));

    // confirm day 1 is visible
    screen.getByTestId('person2-date-1-allocation-value');
  });

  test('3.3', async () => {
    render(<AllocationsManager initialAllocations={allocations} />);

    expect(screen.getByTestId('person1-date-9-allocation-value')).toHaveTextContent('8 hours');
    expect(screen.getByTestId('person1-date-10-allocation-value')).toHaveTextContent('12 hours');

    userEvent.click(screen.getByTestId('month-view'));

    userEvent.click(screen.getByTestId('person1-date-8-14-allocation-value'));
    const allocationInput = screen.getByTestId('allocation-input');
    await userEvent.type(allocationInput, '{backspace}{backspace}49');
    userEvent.click(screen.getByTestId('allocation-popup-save'));

    expect(screen.getByTestId('person1-date-8-14-allocation-value')).toHaveTextContent('49 hours');

    userEvent.click(screen.getByTestId('week-view'));

    // confirm it jumped to day 1-7
    screen.getByTestId('person2-date-1-allocation-value');

    userEvent.click(screen.getByTestId('next-view'));

    expect(screen.getByTestId('person1-date-9-allocation-value')).toHaveTextContent('7 hours');
    expect(screen.getByTestId('person1-date-10-allocation-value')).toHaveTextContent('7 hours');
  });
});
