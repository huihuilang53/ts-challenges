1、any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any。
type IsAny<T> = 'dong' extends ('guang' & T) ? true : false


2、联合类型触发分布式
type IsUnion<A, B = A> =
    A extends A
        ? [B] extends [A]
            ? false
            : true
        : never

3、如果条件类型左边是类型参数，并且传入的是 never，那么直接返回 never：
type TestNever<T> = T extends number ? 1 : 2; 
type Testresult = TestNever<never>  此处返回的是never

判断never类型：
type IsNever<T> = [T] extends [never] ? true : false //此处正确

4、如果类型参数为 any，会直接返回 trueType 和 falseType 的合并
type TestAny<T> = T extends number ? 1 : 2;
TestAny为1|2

5、元组的length 是数字字面量，而数组的 length 是 number。


6、可选索引的值为 undefined 和值类型的联合类型。
type GetOptional<Obj extends  Record<string, any>> = {
    [
        Key in keyof Obj 
            as {} extends Pick<Obj, Key> ? Key : never
    ] : Obj[Key];
}

Pick会选出 如{a: string|undefined}这种










































