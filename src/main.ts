// typescript 相比 javascript的特点在于类型。
// 类型不仅能够帮助我们生成代码提示，更重要的是提升每个模块的规范性，以及团队协作能力
// 完成以下类型纠正题目，并在解决后在仓库的Discussion中发布，以提交作业。
// https://github.com/floatDreamWithSong/Study-group-Typescript-Test/discussions
// 完成标准：main.ts不会发生error（红色警告）
// 完成作业前需要学习typescript的基本类型、基本类型工具以及泛型思想

import type { Equal, Expect, NotAny } from '../lib/utils'

// ============= 热身：开始使用类型！ =============
// tips：学会使用基础类型

{
    type cases = [
        Expect<NotAny<HelloWorld>>,
        Expect<Equal<HelloWorld, string>>,
    ]
}

// ============= 你的答案 =============

type HelloWorld = any

// ============= 简单：实现只读！ =============
// tips：学会使用属性的修饰前缀。不允许直接使用Ts内置的Readonly<>泛型函数

{
    type cases = [
        Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
    ]
    interface Todo1 {
        title: string
        description: string
        completed: boolean
        meta: {
            author: string
        }
    }
}

// ============= 你的答案 =============

type MyReadonly<T> = any

// ============= 简单：怎么推断出函数的参数？ =============
// tips：学会使用infer。不允许使用内置的Parameters<>


{
    const foo = (arg1: string, arg2: number): void => { }
    const bar = (arg1: boolean, arg2: { a: 'A' }): void => { }
    const baz = (): void => { }

    type cases = [
        Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
        Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
        Expect<Equal<MyParameters<typeof baz>, []>>,
    ]

}

// ============= 你的答案 =============

type MyParameters<T extends (...args: any[]) => any> = any

// ============= 简单：怎么将只读属性更改为可写的普通属性？ =============
// tips：学会使用属性的修饰前缀

{
    interface Todo1 {
        title: string
        description: string
        completed: boolean
        meta: {
            author: string
        }
    }

    type List = [1, 2, 3]

    type cases = [
        Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
        Expect<Equal<Mutable<Readonly<List>>, List>>,
    ]

    type errors = [
        // @ts-expect-error
        Mutable<'string'>,
        // @ts-expect-error
        Mutable<0>,
    ]
}

// ============= 你的答案 =============

type Mutable<T extends Record<any, any>> = any

// ============= 中等：为什么Vue2的类型提示跨越了作用域？简单的复现类型提示 =============
// tips：学会使用infer，类型合并，ts内置的工具泛型函数

{
    SimpleVue2({
        data() {
            // @ts-expect-error
            this.firstname
            // @ts-expect-error
            this.getRandom()
            // @ts-expect-error
            this.data()

            return {
                firstname: 'Type',
                lastname: 'Challenges',
                amount: 10,
            }
        },
        computed: {
            fullname() {
                return `${this.firstname} ${this.lastname}`
            },
        },
        methods: {
            getRandom() {
                return Math.random()
            },
            hi() {
                alert(this.amount)
                alert(this.fullname.toLowerCase())
                alert(this.getRandom())
            },
            test() {
                const fullname = this.fullname
                const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
            },
        },
    })

}

// ============= 你的答案 =============
// 如果你需要编写工具函数，可以再声明一个自定义的type变量

declare function SimpleVue2<Data, Comp, Method>(options: {

}): unknown