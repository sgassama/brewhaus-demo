import '@testing-library/jest-dom'
import { vi } from 'vitest';

import * as matchers from '@testing-library/jest-dom/matchers';
import {expect} from 'vitest';

expect.extend(matchers);

// Example: Mock global fetch if needed
vi.stubGlobal('fetch', vi.fn());
