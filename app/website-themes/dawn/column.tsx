import React, { FC } from 'react';
import { Column, Element } from '~/types/page-data';
import { getWidgetComponent } from '../index';
import { useOutletContext } from '@remix-run/react';

const maxWidthMap = ["", "max-w-md", "max-w-lg", "max-w-xl", "max-w-2xl", "max-w-4xl", "max-w-full"]

export const FrameComponent: FC<{ data: Column, elementId: number[] }> = ({ data, elementId }) => {
  const { onSelectElement, inspectorOn } = useOutletContext<{ onSelectElement: (id: string) => void, inspectorOn: boolean }>();
  const { styles, props, children } = data;

  return (
    <>
      <div
        id={"el_" + elementId.join("_")}
        className={`${inspectorOn ? 'focusable inherit-radius after:z-[1]' : ''} w-full h-full overflow-hidden z-[1] relative`}
        onClick={inspectorOn ? (e) => {
          e.stopPropagation();
          onSelectElement(elementId.join("_"))
        } : undefined}
        style={{
          backgroundColor: styles.background || "initial",
          opacity: styles.opacity || 1,
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
          } : {}),
          borderColor: styles.borderColor || "transparent",
          borderStyle: styles.borderStyle || "solid",
          ...(styles.borderWidth ? {
            borderTopWidth: styles.borderWidth[0] || 0,
            borderRightWidth: styles.borderWidth[1] || 0,
            borderBottomWidth: styles.borderWidth[2] || 0,
            borderLeftWidth: styles.borderWidth[3] || 0
          } : {}),
        }}
      >
        {props.backgroundImage &&
          <>
            <div className='absolute inset-0 z-[1]' style={{ opacity: 1 - (styles.overlayOpacity || 0) }}>
              {props.backgroundImage && <img className='h-full w-full object-cover' src={props.backgroundImage.url} />}
            </div>
            {/* <div className='absolute inset-0 z-[0] bg-black' /> */}
          </>
        }
        <div
          style={{
            justifyContent: styles.justify || "flex-start",
          }}
          className={`h-full flex flex-col flex-wrap relative z-[2] overflow-hidden
            ${maxWidthMap[styles.maxWidth || 6]} 
            ${styles.horizontalAlign === "center" ? 'mx-auto' : styles.horizontalAlign === "right" ? 'ml-auto' : ''}
          `}
        >
          {children.map((widgetElement, index) => {
            return (
              <WidgetRenderer data={widgetElement} widgetIndex={index} elementId={[...elementId, index]} key={index} />
            )
          })}
        </div>
      </div>
    </>
  )
}


const WidgetRenderer: FC<{ data: Element, widgetIndex: number, elementId: number[] }> = ({ data, widgetIndex, elementId }) => {
  const Component = getWidgetComponent("DAWN", data.name) as FC<{ props: typeof data.props, elementId: string }>;
  if (!Component) {
    return null
  }
  return (
    <>
      <Component props={data.props} elementId={elementId.join("_")} />
    </>
  )
}