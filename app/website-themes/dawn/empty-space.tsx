import { useOutletContext } from '@remix-run/react';
import { FC } from "react";
import { BaseElementProps } from '~/types/page-data';

// This is a empty-space element. Renders based on provided styles and data

export const EmptySpaceWidget: FC<{ props: BaseElementProps, elementId: string }> = ({ props: { styles }, elementId }) => {
  const { onSelectElement, inspectorOn } = useOutletContext<{ onSelectElement: (id: string) => void, inspectorOn: boolean }>();
  return (
    <div
      id={'el_' + elementId}
      className={`${inspectorOn ? 'focusable no-interaction z-[2]' : ''} overflow-hidden w-full`}
      onClick={inspectorOn ? (e) => {
        e.stopPropagation();
        onSelectElement(elementId)
      } : undefined}
      style={{
        ...styles.heightType === "AUTO" && { display: 'flex', flex: 1 },
        height: styles.heightType === "PIXELS" ? (styles.height || 100) : styles.heightType === "FULL" ? "100%" : "auto",
        aspectRatio: styles.heightType === "RELATIVE" ? Math.max(Math.min((styles.height || 1), 2), 0.5) : 'unset',
      }}>
    </div>
  );
}
