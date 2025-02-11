interface Window {
  dataLayer: Record<string, any>[];
}

type DataLayerEvent = {
  event: string;
  [key: string]: any;
};
