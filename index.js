const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');

const { expect } = chai;
chai.use(sinonChai);

const { getResolvePromise, getRejectPromise } = require('./service.js');

describe('.then()', () => {
  context('when promise resolved', () => {
    const promise = getResolvePromise();
    const callback = sinon.stub();
    it('should trigger callback once', async () => {
      await promise.then(callback);
      expect(callback).to.have.been.calledOnce;
    });
  });
});
