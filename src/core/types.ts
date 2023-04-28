export interface MidParams {
  marginpaddingLayout?: Set<string>;
  positionLayoutSet?: Set<string>;
  widthStyleSet?: Set<string>;
  heightStyleSet?: Set<string>;
  [propName: string]: any;
}

export interface PluginOptions {
  cssUnit?: string;
}
