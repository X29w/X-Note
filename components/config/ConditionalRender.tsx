import type { FC, ReactNode } from "react";

interface ConditionalRenderProps {
  /** 条件 */
  condition: boolean;

  /** 为true时渲染的元素 */
  children: ReactNode;

  /** 为false时渲染的元素 */
  fallback?: ReactNode;
}

const ConditionalRender: FC<ConditionalRenderProps> = ({
  condition = true,
  children,
  fallback = null,
}) => (condition ? children : fallback);

export default ConditionalRender;
