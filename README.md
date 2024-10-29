## Getting Started

This app, **Timeline Allocation Manager**(for February Month - non-leap year), is designed for managing and displaying working hour allocations for individuals across different timeframes. The app allows users to switch between **Day, Week, and Month** views, where each view provides a distinct perspective on time allocations. The user interface provides a grid structure to present individuals and their working hours, with a simple toggle feature to switch between timeframes.

### Core Concept: Allocations

Allocations are the **assigned working hours** for each individual over specific time periods. The app displays these allocations in a structured grid:

- The **left column** lists individuals.
- The **right section** shows their allocations based on the selected view (Day, Week, or Month).

For instance, if a user is working **8 hours each day**, the Week view will show **56 hours total** for that week. These allocations can be edited per timeframe, updating the display across other views to keep allocations synchronized.

## Key Features to Implement

### 1. View Switching

- The app provides toggles to switch between Day, Week, and Month views.
- Each view displays allocations for that specific period:
  - **Day View** shows each day individually.
  - **Week View** shows 7 days allocations for a week.
  - **Month View** aggregates daily allocations for weekly totals and shows 4 weeks of month considering there are 28 days in a month

### 2. Allocation Display and Editing

- Allocations appear as **bars labeled with the total hours** (e.g., "56 hours").
- Clicking on a bar opens a **popup** for editing the working hours for that period.
- Changes in Day View affect only that day, while changes in Week or Month views adjust totals accordingly.

### 3. Cross-View Synchronization

- Edits in any view are reflected across all views to ensure consistency.
- For example, if a user adjusts the hours in **Day View** from 8 to 2, the totals in **Week and Month Views** adjust accordingly.

### 4. Popup for Allocation Editing

- The popup allows users to **input new working hours**, with updates applied across relevant views.
- Users see real-time updates in totals when toggling between views.

## Sample Workflow

Suppose the current view is set to **Week (Feb 22 - Feb 28)**:

- **Initial Allocation**: An individual has a total of **56 hours** for the week (8 hours each day).
- **Switch to Day View**: The user views **Feb 22** and sees **8 hours** for that day.
- **Edit Allocation**: The user changes **Feb 22**'s hours to **2 hours**.
- **Return to Week View**: The total hours for **Feb 22 - Feb 28** updates to **50 hours**.

This app helps users manage and monitor time allocations dynamically across different timeframes, supporting streamlined tracking and updates.

**NOTE**: Please refer to `src/__tests__/sample.test.js` for better understanding the requirements

## Submission Instructions
1. Clicking "Run code" will compile and run your code against sample tests, but it will not generate scores. Click on "Execution Log" to better understand the test execution.
2. Clicking "Submit code" will run your code against multiple test cases, assessing different scenarios holistically. The score will be assigned accordingly.

To access the instructions, click on the "Question" button which can be found in the bottom left corner of the screen.
