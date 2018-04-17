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
  let getPromise;
  before(() => {
    getPromise = (headPromise, callbacks) => {
      const [firstCallback, secondCallback, firstErrorCallback, secondErrorCallback] = callbacks;
      return headPromise
        .then(firstCallback)
        .catch(firstErrorCallback)
        .then(secondCallback)
        .catch(secondErrorCallback);
    };
  });
  context('when promise resolved', () => {
    let callbacks;
    before('set up promise', async () => {
      callbacks = [];
      for (let i = 0; i < 4; ++i) {
        callbacks.push(sinon.spy());
      }
    });
    it('should trigger first and second callbacks', async () => {
      const [firstCallback, secondCallback, firstErrorCallback, secondErrorCallback] = callbacks;
      await getPromise(getResolvePromise(), callbacks);
      expect(firstCallback).to.have.been.calledOnce;
      expect(firstErrorCallback).to.have.callCount(0);
      expect(secondCallback).to.have.been.calledOnce;
      expect(secondErrorCallback).to.have.callCount(0);
    });
  });
  context('when promise rejected', () => {
    let callbacks;
    before('set up promise', async () => {
      callbacks = [];
      for (let i = 0; i < 4; ++i) {
        callbacks.push(sinon.spy());
      }
    });
    it('should trigger first error callback and second callback', async () => {
      const [firstCallback, secondCallback, firstErrorCallback, secondErrorCallback] = callbacks;
      await getPromise(getRejectPromise(), callbacks);
      expect(firstCallback).to.have.callCount(0);
      expect(firstErrorCallback).to.have.been.calledOnce;
      expect(secondCallback).to.have.been.calledOnce;
      expect(secondErrorCallback).to.have.callCount(0);
    });
  });
});
