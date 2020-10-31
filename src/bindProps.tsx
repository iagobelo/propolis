import React, { ComponentType } from 'react';

/**
 * Bind props to a component.
 * @example
 * type ButtonProps = {
 *   type: 'button' | 'submit' | 'reset';
 *   onClick?: () => void;
 *   children?: ReactNode;
 * };
 *
 * const Button = (props: ButtonProps) => {
 *   // ...
 * };
 *
 * // renders a Button with "type" prop already defined as "submit".
 * const SubmitButton = bindProps({ type: 'submit' })(Button);
 * @param boundedProps - An object with props to be bounded to component.
 */
function bindProps<BoundedProps>(boundedProps: BoundedProps) {
  return <Props extends BoundedProps>(
    Component: ComponentType<Props>,
  ): ComponentType<Omit<Props, keyof BoundedProps>> => {
    const ComponentWithBoundProps = (
      props: Omit<Props, keyof BoundedProps>,
    ) => <Component {...({ ...props, ...boundedProps } as Props)} />;

    ComponentWithBoundProps.displayName =
      'bound ' + (Component.displayName || Component.name || 'Anonymous');

    return ComponentWithBoundProps;
  };
}

export default bindProps;
