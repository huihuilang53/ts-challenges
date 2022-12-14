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




![image](https://user-images.githubusercontent.com/71922541/207505878-04c068be-1f20-430e-8cb4-45dbe1d79dc7.png)









