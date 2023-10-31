
export interface Image {
  url: string;
}

export type ImageType = {
  id: string;
  url: string;
  meta: { [x: string]: {} | undefined | string };
}