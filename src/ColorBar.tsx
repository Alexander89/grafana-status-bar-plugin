import React from 'react';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';

export type SectionData = {
  x: number;
  width: number;
  value: number;
  color: string;
};
type Props = {
  data: SectionData[];
  height: number;
  width: number;
};

export const ColorBar = ({ data, width, height }: Props): JSX.Element => {
  const styles = getStyles();

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <svg
        className={styles.svg}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`0 0 ${width} ${height}`}
      >
        <g>
          {data.map(({ x, width, color }) => (
            <rect x={x} y={0} width={width} height={height} style={{ fill: color, strokeWidth: 0 }} />
          ))}
        </g>
      </svg>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
