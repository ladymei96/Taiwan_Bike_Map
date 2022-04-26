import { describe, it, expect } from 'vitest';
import { distance } from './distance.js';

it('convert distance', () => {
  const p1 = {
    x: 25.0103466,
    y: 121.2970898
  };
  const p2 = {
    x: 24.968128,
    y: 121.194666
  };
  const unit = 'M';
  const result = 11339;
  expect(distance(p1, p2, unit)).toBe(result);
});
