# vue组件

## 组件基础

### prop

``` js
export default {
  props: {
    size: {
      // 确保值为枚举的值
      validator (val) {
        return val.indexOf(['small', 'large', 'default']) > -1
      },
      default: 'default'
    }
  }
}
```

一些html的标准特性如 id, class 会传入自定义组件上，可通过 inheritAttrs: false 关闭

### slot

活用插槽占位符

### event

单向数据流无法直接修改props的值，而是通过event通知父级，由父级来修改

## 组件通信

### provide/inject

``` js
// A.vue
export default {
  provide: {
    name: 'Aresn'
  }
}

// B.vue
export default {
  inject: ['name'],
  mounted () {
    console.log(this.name);  // Aresn
  }
}
```

A组件的所有子组件都能通过inject获取到name的值

> 注意project/inject绑定的值是不可响应的，即A的name改变不会改变B的name, 除非传入一个可响应对象，

``` js
// App.vue
export default {
  provide() {
    return {
      app: this
    }
  }
}

// foo.vue
export default {
  inject: ['app']
}
```

局部mixin可以减少主体代码的复杂度

### dispatch和broadcast

``` js
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
```

## Vue构造器

创建Vue实例时的el 用来指定实例的根节点，如果不写 el，组件处于未挂载状态。

Vue.extend的参数和 new Vue基本一样，再配合 $mount或者el 可以让组件挂载到任意指定的节点上。

``` js
// 在线浏览vue文件的效果 伪代码
// 步骤一：根据template,script,style分割三部分代码, 把 script中的字符串里替换 export default 为 return
// 步骤二：通过 Vue.extend 方法挂载到指定节点上展示效果
// 步骤三：在 head 下新增一个 style标签, 放入style代码
// 步骤四：在组件销毁的生命周期里移除 style标签和 html结构
// 步骤五：实时监听代码可以热更新
```

## 函数式组件

函数式组件没有响应式数据，也没有this上下文

``` js
Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
})
```
