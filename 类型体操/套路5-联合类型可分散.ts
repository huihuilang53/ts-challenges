//分布式特性
type GetArrType<T> = T extends any
? T[] : never
// T[]的作用会分布到strig和number上，形成string[] | number[] 
type StrOrNumArr = GetArrType<string | number>  // string[] | number[]


//IsUnion   注意联合的分布式特性
type IsUnion<A, B = A> =
    A extends A
        ? [B] extends [A]
            ? false
            : true
        : never
//[B] extends [A] 并没触发分布式  所以返回true
// 当 A 是联合类型时：
// A extends A 这种写法是为了触发分布式条件类型，让每个类型单独传入处理的，没别的意义。
// A extends A 和 [A] extends [A] 是不同的处理，前者是单个类型和整个类型做判断，后者两边都是整个联合类型，因为只有 extends 左边直接是类型参数才会触发分布式条件类型。


//BEM

type BEM<
    Block extends string,
    Element extends string[],
    Modifiers extends string[]
> = `${Block}__${Element[number]}--${Modifiers[number]}`;









