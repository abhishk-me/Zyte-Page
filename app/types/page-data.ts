
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

export interface DynamicData {
  source: DynamicData;
  id: string;
  displayName: string;
}

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

export interface Column {
  props: ColumnProps;
  styles: CommonStyles;
  children: Element[];
}

export interface ColumnProps {
  backgroundImage?: ImageType;
  width: number
}

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


export type ButtonGroupProps = {
  type: "Button";
  gap: number;
  align?: "left" | "center" | "right"
  buttons: ButtonElement[]
}

export interface ButtonElement {
  text?: string;
  link?: LinkType;
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


export interface LinkType {
  handle: string;
  link: string;
  target: ClickTarget;
  displayName: string;
}

export const linkInitial: LinkType = {
  handle: "",
  link: '',
  target: ClickTarget.EXTERNAL,
  displayName: ""
}

export interface HeaderProps {
  background: string;
  color: string;
  borderColor?: string;
  loaderColor?: string;
  logo?: ImageType;
  buttonColor?: string;
  buttonTextColor?: string;
  buttonBorderColor?: string;
  headerSize?: number;
  helloBar?: boolean;
  helloBarText?: string[];
  helloBarBg?: string;
  helloBarColor?: string
}

export interface FooterProps {
  background: string;
  color: string;
  logo?: ImageType;
  links: {
    title: string,
    link: string
  }[];
}

export interface ElementEditorProps<D> {
  data: D
  onChange: (data: D) => void
}

export interface ElementDefType<D> {
  props: D;
  displayName: string;
  name: Elements;
  altName?: string;
  Editor: React.FC<ElementEditorProps<D>>
}

export type Element = Omit<ElementDefs, 'Editor'>;

export type ElementDefs = ElementDefType<ElementProps>

export type ElementProps = BaseElementProps | ButtonGroupProps