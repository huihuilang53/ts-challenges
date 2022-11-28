interface Expected1  {
    title: string
  }
  
  interface Expected2   {
    title: number;
    completed: boolean
  }
  
  
  type Length<T  ,K > = {
    [key in keyof K| keyof T ]: key extends keyof K ? K[key] : key extends keyof T ? T[key] :never
    
  }
  
  type a = Length<Expected1, Expected2>
  