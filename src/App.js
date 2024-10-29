import React from 'react';
import { AllocationsManager } from './AllocationsManager';

import { allocations } from './data';

const App = () => <AllocationsManager initialAllocations={allocations} />;

export default App;
