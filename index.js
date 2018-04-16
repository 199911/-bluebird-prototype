const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');

const { expect } = chai;
chai.use(sinonChai);

const { getResolvePromise, getRejectPromise } = require('./service.js');

describe('.then()', () => {
  context('when promise resolved', () => {
    it('should trigger callback once', async () => {
      const callback = sinon.spy();
      const promise = getResolvePromise()
        .then(callback);
      await promise;
      expect(callback).to.have.been.calledOnce;
    });
  });

  context('when promise rejected', () => {
    it('should not trigger callback', async () => {
      const callback = sinon.spy();
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
      const callback = sinon.spy();
      const promise = getResolvePromise()
        .catch(callback);
      await promise;
      expect(callback).to.have.callCount(0);
    });
  });

  context('when promise rejected', () => {
    it('should not trigger callback', async () => {
      const callback = sinon.spy();
      const errorCallback = sinon.spy();
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
  context('when promise resolved', () => {
    const firstCallback = sinon.spy();
    const secondCallback = sinon.spy();
    const firstErrorCallback = sinon.spy();
    const secondErrorCallback = sinon.spy();
    let main;

    before('set up promise', async () => {
      main = () => {
        return getResolvePromise()
          .then(firstCallback)
          .catch(firstErrorCallback)
          .then(secondCallback)
          .catch(secondErrorCallback);
      }
    });

    it('should trigger first and second callbacks', async () => {
      await main();
      expect(firstCallback).to.have.been.calledOnce;
      expect(secondCallback).to.have.been.calledOnce;
    });
  });
});
