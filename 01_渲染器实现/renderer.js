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
