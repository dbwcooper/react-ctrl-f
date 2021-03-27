export const PENDING: string = 'pending';
export const FULFILLED: string = 'fulfilled';
export const REJECTED: string = 'rejected';

/**
 * Promise 特点
 * #1 构造函数传入 的时一个函数
 * #2 必须有 then
 * #3 三种状态 pending, fulfilled, rejected
 *    默认状态为 pending
 *
 * #4 resolve 返回 值， reject 返回 error
 */

// 同步状态 的promise
export class SyncPromise {
  status: 'pending' | 'fulfilled' | 'rejected';
  value: any;
  errorReason: any;
  constructor(executor: (res: any, rej: any) => {}) {
    this.status = 'pending';
    let resolve = (value: any) => {
      this.status = 'fulfilled';
      this.value = value;
    };
    let reject = (errorReason: any) => {
      this.status = 'rejected';
      this.errorReason = errorReason;
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then = (onFulfilled: any, onRejected?: any) => {
    if (this.status === 'fulfilled') {
      return onFulfilled(this.value);
    } else if (this.status === 'rejected') {
      return onRejected(this.errorReason);
    }
  };
}

/**
 * #1 executor
 * #2 resolve
 * #3 reject
 * #4 then: onFulfilled onRejected
 *
 * #5 then: 链式调用
 *    需要返回 promise 对象
 *    then 的返回结果可能是 promise 对象
 */
export class AsyncPromise {
  status: 'pending' | 'fulfilled' | 'rejected';
  resolveValue: any;
  rejectReason: any;

  resolveCallbacks: any;
  rejectCallbacks: any;

  constructor(executor: any) {
    this.status = 'pending';
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    let resolve: any = (resolveValue: any) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.resolveValue = resolveValue;
        console.log('this.resolveValue: ', this.resolveValue);
        console.log('this: ', this);
        console.log('this.resolveCallbacks: ', this.resolveCallbacks.length);
        this.resolveCallbacks.forEach((fn: any) => fn(this.resolveValue));
      }
    };
    let reject: any = (rejectReason: any) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.rejectReason = rejectReason;
        this.rejectCallbacks.forEach((fn: any) => fn(this.rejectReason));
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      console.log('error: ', error);
      reject(error);
    }
  }

  then(onFulfilled: any, onRejected?: any) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : () => this.resolveValue;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : () => {
            throw Error;
          };
    let p = new AsyncPromise((resolve: any, reject: any) => {
      setTimeout(() => {
        console.log('this.statu: ', this.status);
        if (this.status === 'fulfilled') {
          let x = onFulfilled(this.resolveValue);
          resolve(x);
        }
        if (this.status === 'rejected') {
          let x = onRejected(this.rejectReason);
          reject(x);
        }
        // 异步
        if (this.status === 'pending') {
          this.resolveCallbacks.push(() => {
            resolve(this.resolveValue);
          });
          this.rejectCallbacks.push(() => {
            resolve(this.rejectReason);
          });
        }
      }, 0);
    });
    console.log('p.status: ', p);
    return p;
  }
}
