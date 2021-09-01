import { TelMaskPipe } from './tel-mask.pipe';

describe('TelMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new TelMaskPipe();
    expect(pipe).toBeTruthy();
  });
});
