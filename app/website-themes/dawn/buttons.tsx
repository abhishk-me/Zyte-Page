import { useOutletContext } from '@remix-run/react';
import { FC } from "react";
import { ButtonGroupProps } from '~/types/page-data';


export const ButtonWidget: FC<{ props: ButtonGroupProps, elementId: string }> = ({ props, elementId }) => {
  const { onSelectElement, inspectorOn } = useOutletContext<{ onSelectElement: (id: string) => void, inspectorOn: boolean }>();

  return (
    <div
      id={'el_' + elementId}
      className={`${inspectorOn ? 'focusable no-interaction' : ''} overflow-hidden w-full`}
      onClick={inspectorOn ? (e) => {
        e.stopPropagation();
        onSelectElement(elementId)
      } : undefined}
    >
      <div
        style={{ margin: -(props.gap || 0), justifyContent: props.align === "center" ? "center" : props.align === "right" ? 'flex-end' : 'flex-start' }}
        className='flex flex-row flex-wrap'
      >
        {props.buttons.map((button, index) => (
          <div
            className='relative'
            key={index}
            style={{
              width: button.widthType === "FULL" ? "100%" : button.widthType === "PIXELS" ? button.width : 'unset',
              padding: props.gap
            }}
          >
            <button
              style={{
                fontSize: button.fontSize || 14,
                fontWeight: button.fontWeight || 400,
                color: button.color || "#fff",
                backgroundColor: button.background || "#000",
                textAlign: button.textAlign || "unset",
                borderColor: button.borderColor || "transparent",
                borderStyle: button.borderStyle || "solid",
                ...(button.borderWidth ? {
                  borderTopWidth: button.borderWidth[0] || 0,
                  borderRightWidth: button.borderWidth[1] || 0,
                  borderBottomWidth: button.borderWidth[2] || 0,
                  borderLeftWidth: button.borderWidth[3] || 0
                } : {}),
                ...(button.radius ? {
                  borderTopLeftRadius: button.radius[0] || 0,
                  borderTopRightRadius: button.radius[1] || 0,
                  borderBottomRightRadius: button.radius[2] || 0,
                  borderBottomLeftRadius: button.radius[3] || 0
                } : {}),
                ...(button.padding ? {
                  paddingTop: button.padding[0] || 0,
                  paddingRight: button.padding[1] || 0,
                  paddingBottom: button.padding[2] || 0,
                  paddingLeft: button.padding[3] || 0
                } : { padding: "8px 12px 8px 12px" })
              }}
              className='w-full cursor-pointer hover:opacity-80'
            >
              {button.text || ""}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
