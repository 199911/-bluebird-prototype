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
    it('should not trigger callback', async () => {
      const callback = sinon.stub();
      const promise = getRejectPromise()
        .then(callback);
      try {
        await promise;
      } catch (e) {
      }
      expect(callback).to.have.callCount(0);
    });
  });
});

describe('.catch()', () => {
  context('when promise resolved', () => {
    it('should trigger callback once', async () => {
      const callback = sinon.stub();
      const promise = getResolvePromise()
        .catch(callback);
      await promise;
      expect(callback).to.have.callCount(0);
    });
  });

  context('when promise rejected', () => {
    it('should not trigger callback', async () => {
      const callback = sinon.stub();
      const errorCallback = sinon.stub();
      const promise = getRejectPromise()
        .catch(callback);
      try {
        await promise;
      } catch (e) {
      }
      expect(callback).to.have.been.calledOnce;
    });
  });
});

describe('.then().catch().then().catch()', () => {
  let promise;
  context('when promise resolved', () => {
    const firstCallback = sinon.stub();
    const secondCallback = sinon.stub();
    const firstErrorCallback = sinon.stub();
    const secondErrorCallback = sinon.stub();
    before('set up promise', async () => {
      promise = getResolvePromise()
        .then(firstCallback)
        .catch(firstErrorCallback)
        .then(secondCallback)
        .catch(secondErrorCallback);
      await promise;
    });
    it('should trigger first and second callbacks', () => {
      expect(firstCallback).to.have.been.calledOnce;
      expect(secondCallback).to.have.been.calledOnce;
    });
  });
});
