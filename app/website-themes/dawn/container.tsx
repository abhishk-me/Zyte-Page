import React, { FC, useState } from 'react';
import { Container } from '~/types/page-data';
import { FrameComponent } from './column';
import { useOutletContext } from '@remix-run/react';

export const ContainerComponent: FC<{ data: Container, elementId: number[] }> = ({ data, elementId }) => {
  const { onSelectElement, inspectorOn } = useOutletContext<{ onSelectElement: (id: string) => void, inspectorOn: boolean }>();
  const { styles } = data;
  return (
    <section
      style={{
        backgroundColor: styles.background || "transparent",
        opacity: styles.opacity || 1
      }}
      id={"el_" + elementId.join("_")}
      className={`${inspectorOn ? 'focusable thick' : ''}`}
      onClick={inspectorOn ? () => onSelectElement(elementId.join("_")) : undefined}
    >
      <LayoutContentMemo data={data} elementId={elementId} />
    </section>
  )
}

const ContainerContent: FC<{ data: Container, elementId: number[] }> = ({ data, elementId }) => {
  const { props: { gap, }, styles } = data;
  const sumGrow = data.children.reduce((sum, col) => sum + col.props.width, 0);
  return (
    <div
      className={`relative my-0 overflow-hidden ${styles.containerType === "CONTAINER" ? 'container-m mx-auto' : ''}`}
      style={{
        ...(styles.padding ? {
          paddingTop: styles.padding[0] || 0,
          paddingRight: styles.padding[1] || 0,
          paddingBottom: styles.padding[2] || 0,
          paddingLeft: styles.padding[3] || 0
        } : {}),
        ...(styles.radius ? {
          borderTopLeftRadius: styles.radius[0] || 0,
          borderTopRightRadius: styles.radius[1] || 0,
          borderBottomRightRadius: styles.radius[2] || 0,
          borderBottomLeftRadius: styles.radius[3] || 0
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
      <div
        className={`flex flex-row flex-wrap`}
        style={{
          margin: -(gap || 0) / 2,
        }}
      >
        {data.children.map((column, columnIndex) => {
          return (
            <div
              key={columnIndex}
              className='sm-w-full flex flex-col'
              style={{
                width: `${((column.props.width / sumGrow) * 100)}%`,
                padding: (gap || 0) / 2,
              }}
            >
              <div
                className='flex flex-col flex-1 relative'
              >
                <FrameComponent
                  data={column}
                  elementId={[...elementId, columnIndex]}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div >
  )
}

const LayoutContentMemo = React.memo(ContainerContent)