import { expect } from 'chai';

import { superpathjoin } from '.';


describe('superpathjoin', () => {
  it('should join parts', () => {
    const ret = superpathjoin('path', 'to', 'assets');
    expect(ret).equal('path/to/assets');
  });

  it('should cast parts to string', () => {
    const ret = superpathjoin('path', 'to', 'assets', 42);
    expect(ret).equal('path/to/assets/42');
  });

  it('should join with deduplicate slashes', () => {
    const ret = superpathjoin('//path/', '/to', 'assets///');
    expect(ret).equal('/path/to/assets/');
  });

  it('should keep the last slash', () => {
    const ret = superpathjoin('//path/', '/to', 'assets/', '/');
    expect(ret).equal('/path/to/assets/');
  });

  it('should return an absolute path if the last arg is true', () => {
    const ret = superpathjoin('path/', '/to', 'assets/', true);
    expect(ret).equal('/path/to/assets/');
  });

  it('should remove the first slash if the last arg is false', () => {
    const ret = superpathjoin('/path/', '/to', 'assets/', false);
    expect(ret).equal('path/to/assets/');
  });

  it('should filter empty values', () => {
    const ret = superpathjoin('path', null, undefined, '', 'to', {}, [], 42);
    expect(ret).equal('path/to/42');
  });

  it('should trim args', () => {
    const ret = superpathjoin('path ', ' to ', 'assets/');
    expect(ret).equal('path/to/assets/');
  });

  it('should handle "../" relative parts', () => {
    const ret = superpathjoin('path', 'to', '..', 'assets');
    expect(ret).equal('path/assets');
  });

  it('should not replace "://"', () => {
    const ret = superpathjoin('https://hostname/', '/path/', 'to', 'assets');
    expect(ret).equal('https://hostname/path/to/assets');
  });
});
