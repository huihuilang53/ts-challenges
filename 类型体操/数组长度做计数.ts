//Add 函数  Add<25,35>=60
type BuildArray<
Length extends number, 
Ele = unknown, 
Arr extends unknown[] = []
> = Arr['length'] extends Length 
    ? Arr 
    : BuildArray<Length, Ele, [...Arr, Ele]>;

type Add<Num1 extends number, Num2 extends number> = 
[...BuildArray<Num1>,...BuildArray<Num2>]['length'];

//sub 减法
type Subtract<Num1 extends number, Num2 extends number> = 
    BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest]
        ? Rest['length']
        : never;

//Mutiply  实现乘法， num2个num1数组相加
type Mutiply<
    Num1 extends number,
    Num2 extends number,
    ResultArr extends unknown[] = []
> = Num2 extends 0 ? ResultArr['length']
        : Mutiply<Num1, Subtract<Num2, 1>, [...BuildArray<Num1>, ...ResultArr]>;

//Divide  除法， num1减取n个num2  ，n为所求
type Divide<
    Num1 extends number,
    Num2 extends number,
    CountArr extends unknown[] = []
> = Num1 extends 0 ? CountArr['length']
        : Divide<Subtract<Num1, Num2>, Num2, [unknown, ...CountArr]>;

//StrLen 计算str长度
type StrLen<
    Str extends string,
    CountArr extends unknown[] = []
> = Str extends `${string}${infer Rest}` 
    ? StrLen<Rest, [...CountArr, unknown]> 
    : CountArr['length']


// 比大小   往一个数组类型中不断放入元素取长度，如果先到了 A，那就是 B 大，否则是 A 大：
type GreaterThan<
    Num1 extends number,
    Num2 extends number,
    CountArr extends unknown[] = []
> = Num1 extends Num2 
    ? false
    : CountArr['length'] extends Num2
        ? true
        : CountArr['length'] extends Num1
            ? false
            : GreaterThan<Num1, Num2, [...CountArr, unknown]>;


//斐波那契 实现 
type FibonacciLoop<
    PrevArr extends unknown[], 
    CurrentArr extends unknown[], 
    IndexArr extends unknown[] = [], 
    Num extends number = 1
> = IndexArr['length'] extends Num
    ? CurrentArr['length']
    : FibonacciLoop<CurrentArr, [...PrevArr, ...CurrentArr], [...IndexArr, unknown], Num> 

type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>;

// 类型参数 PrevArr 是代表之前的累加值的数组。类型参数 CurrentArr 是代表当前数值的数组。

// 类型参数 IndexArr 用于记录 index，每次递归加一，默认值是 []，代表从 0 开始。

// 类型参数 Num 代表求数列的第几个数。

// 判断当前 index 也就是 IndexArr['length'] 是否到了 Num，到了就返回当前的数值 CurrentArr['length']。

// 否则求出当前 index 对应的数值，用之前的数加上当前的数 [...PrevArr, ... CurrentArr]。

// 然后继续递归，index + 1，也就是 [...IndexArr, unknown]。

// 这就是递归计算 Fibinacci 数列的数的过程。



































