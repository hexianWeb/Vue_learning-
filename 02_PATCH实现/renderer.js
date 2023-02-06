const h = (tag, props, children) => {
  //    vnode -> javascript对象
  return {
    tag,
    props,
    children,
  };
};

const mount = (vnode, container) => {
  // 创建实体元素
  let el = (vnode.el = document.createElement(vnode.tag));
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];
      if (key.startsWith("on")) {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  //   处理子节点
  if (vnode.children) {
    if (typeof vnode.children == "string") {
      el.textContext = vnode.children;
    } else {
      vnode.children.forEach((item) => {
        mount(item, el);
      });
    }
  }
  container.appendChild(el);
};

const patch = (n1, n2) => {
  // 第一步 判断vnode 的类型是否一致
  if (n1.tag !== n2.tag) {
    const n1Parent = n1.el.parentElement;
    n1Parent.removeChild(n1.el);
    mount(n2, n1Parent);
  } else {
    // vnode 类型一致

    // 第二部 处理Props
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    // 添加新节点有而旧节点没有的Props属性
    for (const key in newProps) {
      if (key.startsWith("on")) {
        el.addEventListener(key.slice(2).toLowerCase(), newProps[key]);
      } else {
        el.setAttribute(key, newProps[key]);
      }
    }

    // 删除旧节点有而新节点没有的Props属性
    for (const key in oldProps) {
      // in 做判断
      if (!(key in newProps)) {
        el.removeAttribute(key);
      }
    }

    // 第三部 处理Children
    const oldChildren = n1.children;
    const newChlidren = n2.children;
    // 边界情况一 newChildren 是 string
    if (typeof newChlidren === "string") {
      if (typeof oldChildren === "string") {
        if (newChlidren !== oldChildren) {
          el.innerHTML = newChlidren;
        }
      }
    } else {
      // 情况二 newchildren 本身是一个数组
      if (typeof oldChildren === "string") {
        el.innerHTML = "";
        newChlidren.forEach((child) => {
          mount(child, el);
        });
      } else {
        const commonLength = Math.min(oldChildren.length, newChlidren.length);
        for (let index = 0; index < commonLength; index++) {
          patch(oldChildren[index], newChlidren[index]);
        }
        // 新vnode更长 挂载多余节点置节点树
        if (newChlidren.length > oldChildren.length) {
          newChlidren.slice(oldChildren.length).forEach((item) => {
            mount(item, el);
          });
        }

        // 旧vnode更长 需要移除
        if (newChlidren.length < oldChildren.length) {
          oldChildren.slice(newChlidren.length).forEach((item) => {
            el.removeChild(item.el);
          });
        }
      }
    }
  }
};
