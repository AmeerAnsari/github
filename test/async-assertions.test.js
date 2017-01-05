import {until} from './helpers'; // eslint-disable-line no-unused-vars

describe('assert.async', () => {
  it('allows for asynchronous assertions', async () => {
    let val = false;
    setTimeout(() => { val = true; });
    await assert.async.isTrue(val);
  });

  it('allows for setting the timeout', async () => {
    let val = false;
    setTimeout(() => { val = true; }, 100);
    let caught = false;
    try {
      await assert.async(50).isTrue(val);
    } catch (err) {
      caught = true;
    }

    assert.isTrue(caught);
  });

  it('retains the assertion message and adds the timeout', async () => {
    let val = false;
    setTimeout(() => { val = true; }, 100);
    let caught = null;
    try {
      await assert.async(50).isTrue(val);
    } catch (err) {
      caught = err;
    }

    assert.match(caught.message, /^async\(50ms\):/);
    assert.match(caught.message, /false.*true/);
  });
});