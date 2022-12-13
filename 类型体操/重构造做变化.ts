// push 
type Push<Arr extends  unknown[], Ele> = [...Arr, Ele];

//unshift
type Unshift<Arr extends  unknown[], Ele> = [Ele, ...Arr];

//zip  合并数组   ，结果为[[1,2],['guang','dong']]
type tuple = [[1, 'guang'], [2, 'dong']];

type Zip<One extends [unknown, unknown], Other extends [unknown, unknown]> = 
    One extends [infer OneFirst, infer OneSecond]
        ? Other extends [infer OtherFirst, infer OtherSecond]
            ? [[OneFirst, OtherFirst], [OneSecond, OtherSecond]] :[] 
                : [];

//zip 合并 递归版
type Zip2<One extends unknown[], Other extends unknown[]> = 
    One extends [infer OneFirst, ...infer OneRest]
        ? Other extends [infer OtherFirst, ...infer OtherRest]
            ? [[OneFirst, OtherFirst], ...Zip2<OneRest, OtherRest>]: []
                : [];

//CapitalizeStr 首字母大写
type CapitalizeStr<Str extends string> = 
    Str extends `${infer First}${infer Rest}` 
        ? `${Uppercase<First>}${Rest}` : Str;

//CamelCase   实现 dong_dong_dong 到 dongDongDong 的变换。
type CamelCase<Str extends string> = 
    Str extends `${infer Left}_${infer Right}${infer Rest}`
        ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
        : Str;

//DropSubStr  删除某个字符串  
type DropSubStr<Str extends string, SubStr extends string> = 
    Str extends `${infer Prefix}${SubStr}${infer Suffix}` 
        ? DropSubStr<`${Prefix}${Suffix}`, SubStr> : Str;

//AppendArgument  添加参数
type AppendArgument<Func extends Function, Arg> = 
    Func extends (...args: infer Args) => infer ReturnType 
        ? (...args: [...Args, Arg]) => ReturnType : never;


///////////////////////////映射////////////////////////////////////////////////

// {a：1} 变 {a：[1,1,1]}
type Mapping<Obj extends object> = { 
    [Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]]
}

//UppercaseKey  key大写映射
type UppercaseKey<Obj extends object> = { 
    [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key]
}
// 通过 Uppercase 把索引 Key 转为大写，
// 因为索引可能为 string、number、symbol 类型，
// 而这里只能接受 string 类型，所以要 & string，也就是取索引中 string 的部分。


// Record
type MyRecord<K extends string | number | symbol, T> = { [P in K]: T; }

//redonly
type ToReadonly<T> =  {
    readonly [Key in keyof T]: T[Key];
}

//mulreadonly
type ToMutable<T> = {
    -readonly [Key in keyof T]: T[Key]
}

//Partial
type ToPartial<T> = {
    [Key in keyof T]?: T[Key]
}

//类型过滤  只取valuetype
type FilterByValueType<
    Obj extends Record<string, any>, 
    ValueType
> = {
    [Key in keyof Obj 
        as Obj[Key] extends ValueType ? Key : never]
        : Obj[Key]
}