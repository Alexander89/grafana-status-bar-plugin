export interface BarOptions {
  text: string;
  showName: boolean;
  colors: ColorThresholds;
  defaultColor: string;
}

export type ColorThresholdOpp = '<' | '>' | '>=' | '<=' | '=' | '!=';
export type ColorThreshold = {
  opp: ColorThresholdOpp;
  value: number;
  color: string;
};
export type ColorThresholds = Array<ColorThreshold>;

export const colorThresholdOppOptions: ColorThresholdOpp[] = ['<', '>', '>=', '<=', '=', '!='];
export const defaultColorThreshold: ColorThreshold = {
  opp: '<',
  value: 1,
  color: 'blue',
};
