# ts类型体操刷题mark
> typescript类型体操 

建议初学者先学完基础的ts语法，然后取看完神光的TypeScript 类型体操通关秘籍小册，再开刷类型体操
部分体操题型来源：
https://github.com/huihuilang53/type-challenges

刷题记录：

1. as const 
断言
将对象强制转换为 const 时，属性标记为只读，无法修改。
将数组标记为只读元组，或转为字面量
const person = {
  name: 'O.O',
  age: 20
} as const

person.name = 'D.O' // TypeError

const arr = ['O.O', 20] as const

arr[0] = 'D.O' // TypeError


2. typeof
typeof操作符用于获取变量的类型，因此操作符后面接的始终是一个变量。
const p = {
  name: 'CJ',
  age: 18,
  address: {
    city: 'SH'
  }
};

type Person = typeof p;

// 相当于
type Person = {
  name: string;
  age: number;
  address: {
    city: string;
  };
};


const data = ['hello', 'world'] as const;
type Greeting = typeof data[number];

// type Greeting = "hello" | "world"


3. keyof  与映射类型 [xx in yyy]
type OptionsFlags<T> = {
  [Property in keyof T]: boolean;
};
// use the OptionsFlags
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
// 相当于
// type FeatureOptions = {
//   darkMode: boolean;
//   newUserProfile: boolean;
// };

in 关键字的作用类似于 for 循环，它会循环 keyof IProps 这个联合类型中的每一项类型，同时在每一次循环中将对应的类型赋值给 K 。
