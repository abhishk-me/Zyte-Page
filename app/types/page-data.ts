
export type ImageType = {
  id: string;
  url: string;
  meta: { [x: string]: {} | undefined | string };
}

export enum PageStatus {
  DRAFT = "DRAFT",
  LIVE = "LIVE",
  ARCHIVED = "ARCHIVED"
}

export interface PageDataType {
  id?: string;
  pageId?: string;
  name: string;
  url: string;
  sections: PageSection[];
  status: PageStatus;
  title?: string;
  description?: string;
  header: HeaderProps;
  footer: FooterProps;
  createdAt?: string;
  updateAt?: string;
  thumbnail?: string;
}

export interface PageSection {
  layout: Container;
}

// common styles, used on containers, columns and elements. 
// All properties are optional so, different elements can use different propertirs based on their type.
export interface CommonStyles {
  padding?: number[];
  opacity?: number;
  background?: string;
  radius?: number[];
  borderWidth?: number[];
  borderColor?: string;
  borderStyle?: "dashed" | "solid" | 'dotted';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  fontSize?: number;
  fontSizeMobile?: number;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  height?: number;
  heightType?: HeightWidthType
  aspectRatio?: number;
  width?: number;
  widthType?: HeightWidthType;
  objectFit?: 'cover' | 'contain';
  containerType?: "FULL_WIDTH" | "CONTAINER";
  maxWidth?: number;
  backgroundImage?: ImageType;
  textType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  fontWeight?: 400 | 500 | 600 | 700 | 800;
  horizontalAlign?: "left" | "center" | "right";
  overlayOpacity?: number
}

export type HeightWidthType = "FULL" | "AUTO" | "PIXELS" | "PERCENTAGE" | "RELATIVE"

// Container types
export interface Container {
  props: ContainerProps;
  styles: CommonStyles;
  displayName: string;
  children: Column[];
  altName?: string;
}

export interface ContainerProps {
  type: LayoutType;
  gap?: number;
}


export enum LayoutType {
  DEFAULT = "DEFAULT",
  COLUMNS = "COLUMNS",
}

// Column types
export interface Column {
  props: ColumnProps;
  styles: CommonStyles;
  children: Element[];
}

export interface ColumnProps {
  backgroundImage?: ImageType;
  width: number
}

// Base props for simple elements like - text, image, empty-space
export type BaseElementProps = {
  type: "Base";
  styles: CommonStyles;
  text?: string;
  image?: ImageType;
}

export enum Elements {
  IMAGE = "IMAGE",
  TEXT = "TEXT",
  BUTTONS = "BUTTONS",
  EMPTY_SPACE = "EMPTY_SPACE",
}

// for button group
export type ButtonGroupProps = {
  type: "Button";
  gap: number;
  align?: "left" | "center" | "right"
  buttons: ButtonElement[]
}

export interface ButtonElement {
  text?: string;
  padding?: number[];
  background?: string;
  radius?: number[];
  borderWidth?: number[];
  borderColor?: string;
  borderStyle?: "dashed" | "solid" | 'dotted';
  fontSize?: number;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  height?: number;
  width?: number;
  widthType?: HeightWidthType
  fontWeight?: 400 | 500 | 600 | 700 | 800;
}

export enum ClickTarget {
  EXTERNAL = "EXTERNAL",
  PAGE = "PAGE"
}

// header props
export interface HeaderProps {
  background: string;
  color: string;
  borderColor?: string;
  logo?: ImageType;
}

// footer props
export interface FooterProps {
  background: string;
  color: string;
  logo?: ImageType;
  links: {
    title: string,
    link: string
  }[];
}

// Each element has it's own editor. the editor takes the element's data and an onChange function as props
export interface ElementEditorProps<D> {
  data: D
  onChange: (data: D) => void
}

// Element definition has the element to editor mapping with the elements data. 
export interface ElementDefType<D> {
  props: D;
  displayName: string;
  name: Elements;
  altName?: string;
  Editor: React.FC<ElementEditorProps<D>>
}

// elements data that gets saved. whis is element's def minus the editor
export type Element = Omit<ElementDefs, 'Editor'>;

export type ElementDefs = ElementDefType<ElementProps>

// ElementProps can be of any of the element.
export type ElementProps = BaseElementProps | ButtonGroupProps