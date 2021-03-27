
/**
 * 1. async 声明的函数内的代码 视作同步代码。使用 await 阻塞异步 promise
 * 2. async 声明的函数默认会返回一个promise对象
 * 3.
 */

const api = 'https://randomuser.me/api';

export const asyncDemo1 = async () => {
  const a = await fetch('https://www.dogedoge.com/', { mode: 'cors' });
  console.log('my logs a: ', a + 'world');
  return a + 'world';
};

export const asyncDemo11 = async () => {
  const a = await Promise.resolve('hello')
  console.log('a === hello', a === 'hello');
  console.log('my logs a: ', a + ' world');
  console.log('my logs')
  return a + 'world';
};

// async 函数结合await
// await 替换了 then，不会再出现 fetch(api).then().then().then()...

export const asyncDemo2 = async (greeting: string) => {
  return (greeting = await Promise.resolve('hello'));
};

export const asyncAll = async () => {
  const result = await Promise.all([
    fetch(api + '?inc=gender,name,nat', {
      method: 'GET',
      mode: 'cors'
    }),
    fetch(api + '?inc=gender,name', {
      method: 'GET',
      mode: 'cors'
    }),
    fetch(api + '?inc=gender,name,location', {
      method: 'GET',
      mode: 'cors'
    }),
  ]);
  const singleResult = await fetch(api + '?inc=gender,name,nat', {
    method: 'GET',
    mode: 'cors'
  });
  console.log('singleResult: ', singleResult)
  console.log('result: ', JSON.stringify(result));
  console.log('result 2: ')
};

// async 函数如何不阻塞同时执行多个 await。
// 使用对象存储 await 函数，可以同时执行多个await
let startTime = Date.now();
//执行完毕 需要 9秒 
export const doubleAsync = async () => {
  const timeTest1 = await timePromise(3000);
  let now = Date.now();
  console.log('now - startTime1: ', now - startTime);
  const timeTest2 = await timePromise(3000);
  now = Date.now();
  console.log('now - startTime2: ', now - startTime);
  const timeTest3 = await timePromise(3000);
  now = Date.now();
  console.log('now - startTime3: ', now - startTime);
}
// 执行完毕 只需要 3 秒； 因为同时发起promise请求
export const doubleAsync2 = async () => {
  const timeTest1 = timePromise(3000);
  const timeTest2 = timePromise(3000);
  const timeTest3 = timePromise(3000);
  await timeTest1;
  await timeTest2;
  await timeTest3;
  const now = Date.now();
  console.log('now - startTime3: ', now - startTime);
}

const timePromise = (interval: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done');
    }, interval);
  })
}


// 如何优化 promise
const takeTime = (time: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time + 1000)
    }, time);
  })
}
const step1 = (n: number) => {
  console.log(`step1 num: ${n}`);
  return takeTime(n)
}
const step2 = (n: number) => {
  console.log(`step2 num: ${n}`);
  return takeTime(n)
}
const step3 = (n: number) => {
  console.log(`step3 num: ${n}`);
  return takeTime(n)
}

const runStep = () => {
  const time = 1000;
  step1(time)
   .then((time2) => step2(time2 as number))
   .then((time3) => step3(time3 as number))
   .then((result) => {
     console.log(`result: ${result}`)
   })
}

const runStepAwait = async () => {
  const time = 1000;
  const step1Data: number = await step1(time);
  const step2Data: number = await step1(time + step1Data);
  const step3Data = await step1(time + step2Data);
  console.log('step3Data: ', step3Data)
}

// 如果 step2的参数为 time1 + time2， step3的参数为 time1 + time2 + timeTest3
// 这里不是很懂，嵌套多个 then的写法
// then 会返回一个新的promise对象，并且当前then方法内的 resolve参数为 上一个then内resolve的返回值。
const runStepPromise = () => {
  const time1 = 1000;
  step1(time1)
   .then((time2) => {
     return step2(time1, time2)
              .then((time3) => [time1, time2, time3])
   })
   .then((times) => {
     const [time1, time2, time3] = times;
     return step3(time1, time2, time3)
   })
   .then((result) => {
     console.log(`result: ${result}`)
   })
}
