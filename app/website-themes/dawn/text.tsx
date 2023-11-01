import { useOutletContext } from '@remix-run/react';
import { FC } from "react";
import { BaseElementProps } from '~/types/page-data';

// This is a text element. Renders based on provided styles and data

export const TextWidget: FC<{ props: BaseElementProps, elementId: string }> = ({ props: { styles, text, image }, elementId }) => {
  const { onSelectElement, inspectorOn } = useOutletContext<{ onSelectElement: (id: string) => void, inspectorOn: boolean }>();
  const fontSize = styles.fontSize || 14
  const fontSizeMobile = styles.fontSizeMobile || styles.fontSize || 14;
  const widthType = styles.widthType || "FULL"
  return (
    <div
      style={{
        fontWeight: styles.fontWeight || 400,
        color: styles.color || "#000",
        opacity: styles.opacity || 1,
        backgroundColor: styles.background || "transparent",
        textAlign: styles.textAlign || "unset",
        borderColor: styles.borderColor || "transparent",
        borderStyle: styles.borderStyle || "solid",
        ...(styles.borderWidth ? {
          borderTopWidth: styles.borderWidth[0] || 0,
          borderRightWidth: styles.borderWidth[1] || 0,
          borderBottomWidth: styles.borderWidth[2] || 0,
          borderLeftWidth: styles.borderWidth[3] || 0
        } : {}),
        ...(styles.radius ? {
          borderTopLeftRadius: styles.radius[0] || 0,
          borderTopRightRadius: styles.radius[1] || 0,
          borderBottomRightRadius: styles.radius[2] || 0,
          borderBottomLeftRadius: styles.radius[3] || 0
        } : {}),
        ...(styles.padding ? {
          paddingTop: styles.padding[0] || 0,
          paddingRight: styles.padding[1] || 0,
          paddingBottom: styles.padding[2] || 0,
          paddingLeft: styles.padding[3] || 0
        } : {})
      }}
      id={'el_' + elementId}
      className={`${inspectorOn ? 'focusable no-interaction' : ''}`}
      onClick={inspectorOn ? (e) => {
        e.stopPropagation();
        onSelectElement(elementId)
      } : undefined}
    >
      <p
        style={{ fontSize }}
        className={`hidden lg:block ${fontSize > 26 ? 'leading-tight' : fontSize > 18 ? 'leading-snug' : 'leading-normal'}`}
      >
        <span className='relative'>{text}</span>
      </p>
      <p
        style={{ fontSize: fontSizeMobile }}
        className={`block lg:hidden ${fontSizeMobile > 26 ? 'leading-tight' : fontSizeMobile > 18 ? 'leading-snug' : 'leading-normal'}`}
      >
        <span className='relative'>{text}</span>
      </p>
    </div>
  );
}
