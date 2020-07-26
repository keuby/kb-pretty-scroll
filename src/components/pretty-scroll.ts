const needCopyProps = ['staticClass', 'staticStyle', 'class', 'style', 'attrs'];

export const PrettyScrollContainer = {
  functional: true,
  render(createElement: Function, context: any) {
    const nodeData = buildVNodeData(context);
    return createElement('div', nodeData, context.children);
  },
};

function buildVNodeData(context: any) {
  const { hasWrapper = false, ...props } = context.props;

  for (const prop in props) {
    if (props[prop] === '') {
      props[prop] = true;
    }
  }

  const data: any = {};
  for (const prop of needCopyProps) {
    const value = context.data[prop];
    value != null && (data[prop] = value);
  }

  const directive = {
    name: 'pretty-scroll',
    value: props,
  };

  data.directives = [directive];

  return data;
}
