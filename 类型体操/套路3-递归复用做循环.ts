// 递归找出promise的类型
type ttt = Promise<Promise<Promise<Record<string, any>>>>;
type DeepPromiseValueType<P extends Promise<unknown>> =
    P extends Promise<infer ValueType> 
        ? ValueType extends Promise<unknown>
            ? DeepPromiseValueType<ValueType>
            : ValueType
        : never;

//reverse  数组反序
type ReverseArr<Arr extends unknown[]> = 
    Arr extends [infer First, ...infer Rest] 
        ? [...ReverseArr<Rest>, First] 
        : Arr;

//寻找是否包含
type Includes<Arr extends unknown[], FindItem> = 
    Arr extends [infer First, ...infer Rest]
        ? IsEqual<First, FindItem> extends true
            ? true
            : Includes<Rest, FindItem>
        : false;

type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false);

//删除item
type RemoveItem<
    Arr extends unknown[], 
    Item, 
    Result extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
        ? IsEqual1<First, Item> extends true
            ? RemoveItem<Rest, Item, Result>
            : RemoveItem<Rest, Item, [...Result, First]>
        : Result;
        
type IsEqual1<A, B> = (A extends B ? true : false) & (B extends A ? true : false);

//BuildArray  构建指定长度数组
type BuildArray<
    Length extends number, 
    Ele = unknown, 
    Arr extends unknown[] = []
> = Arr['length'] extends Length 
        ? Arr 
        : BuildArray<Length, Ele, [...Arr, Ele]>;


//字符串替换

type ReplaceAll<
    Str extends string, 
    From extends string, 
    To extends string
> = Str extends `${infer Left}${From}${infer Right}`
        ? `${Left}${To}${ReplaceAll<Right, From, To>}`
        : Str;

//字符串转联合类型
type StringToUnion<Str extends string> = 
    Str extends `${infer First}${infer Rest}`
        ? First | StringToUnion<Rest>
        : never;

//字符串反转
type ReverseStr<
    Str extends string, 
    Result extends string = ''
> = Str extends `${infer First}${infer Rest}` 
    ? ReverseStr<Rest, `${First}${Result}`> 
    : Result;


//深度deepreadonly
type DeepReadonly<Obj extends Record<string, any>> =
    Obj extends any
        ? {
            readonly [Key in keyof Obj]:
                Obj[Key] extends object
                    ? Obj[Key] extends Function
                        ? Obj[Key] 
                        : DeepReadonly<Obj[Key]>
                    : Obj[Key]
        }
        : never;










