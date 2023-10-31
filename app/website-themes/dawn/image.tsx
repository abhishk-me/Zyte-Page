import { useOutletContext } from '@remix-run/react';
import { FC } from "react";
import { BaseElementProps } from '~/types/page-data';


export const ImageWidget: FC<{ props: BaseElementProps, elementId: string }> = ({ props: { styles, text, image }, elementId }) => {
  const { onSelectElement, inspectorOn } = useOutletContext<{ onSelectElement: (id: string) => void, inspectorOn: boolean }>();
  return (
    <div
      id={'el_' + elementId}
      className={`${inspectorOn ? 'focusable no-interaction' : ''} overflow-hidden`}
      onClick={inspectorOn ? (e) => {
        e.stopPropagation();
        onSelectElement(elementId)
      } : undefined}
      style={{
        ...(styles.heightType === "RELATIVE" ? {
          aspectRatio: Math.max(Math.min((styles.height || 1), 2), 0.5)
        } : {
          height: styles.heightType === "PIXELS" ? (styles.height || 100) :
            styles.heightType === "PERCENTAGE" ? `${styles.height || 100}%` :
              styles.heightType === "FULL" ? "100%" :
                "auto",
        }),
        width: styles.widthType === "PIXELS" ? (styles.width || 100) :
          styles.widthType === "PERCENTAGE" ? `${styles.width || 100}%` :
            styles.widthType === "FULL" ? "100%" :
              "auto",
        marginLeft: `${styles.textAlign === "left" ? 'unset' : styles.textAlign === "center" ? 'auto' : styles.textAlign === "right" ? 'auto' : 'unset'}`,
        marginRight: `${styles.textAlign === "left" ? 'unset' : styles.textAlign === "center" ? 'auto' : 'unset'}`
      }}>
      <div
        style={{
          fontSize: styles.fontSize || 14,
          fontWeight: styles.fontWeight || 400,
          color: styles.color || "#000",
          opacity: styles.opacity || 1,
          backgroundColor: styles.background || "transparent",
          textAlign: styles.textAlign || "left",
          borderColor: styles.borderColor || "transparent",
          borderStyle: styles.borderStyle || "solid",
          height: "100%",
          width: "100%",
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
        className='overflow-hidden'
      >
        {image && <img className='w-full h-full object-cover' src={image?.url} />}
      </div>
    </div>
  );
}
