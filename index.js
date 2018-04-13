const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');

const { expect } = chai;
chai.use(sinonChai);

const { getResolvePromise, getRejectPromise } = require('./service.js');

describe('.then()', () => {
  context('when promise resolved', () => {
    it('should trigger callback once', async () => {
      const callback = sinon.stub();
      const promise = getResolvePromise()
        .then(callback);
      await promise;
      expect(callback).to.have.been.calledOnce;
    });
  });

  context('when promise rejected', () => {
    it('should trigger errorCallback and callback will be skipped', async () => {
      const callback = sinon.stub();
      const errorCallback = sinon.stub();
      const promise = getRejectPromise()
        .then(callback)
        .catch(errorCallback);
      await promise;
      expect(callback).to.have.callCount(0);
      expect(errorCallback).to.have.been.calledOnce;
    });
  });
});
