import React from 'react';
import { Field, PanelProps, Vector } from '@grafana/data';
import { BarOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { ColorBar, SectionData } from 'ColorBar';

interface Props extends PanelProps<BarOptions> {}

type DrawData = {
  data: SectionData[];
  name: string;
};

type FieldData = {
  name: string;
  data: Field<number, Vector<number>>;
};

export const StatusBarPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();
  const { colors, defaultColor, showName, namesWidth } = options;

  const getColor = (value: number) => {
    const match = colors.find(rule => {
      switch (rule.opp) {
        case '=':
          return value === rule.value;
        case '!=':
          return value !== rule.value;
        case '<':
          return value < rule.value;
        case '<=':
          return value <= rule.value;
        case '>':
          return value > rule.value;
        case '>=':
          return value >= rule.value;
        default:
          return false;
      }
    });
    return match ? match.color : defaultColor;
  };

  const from = data.timeRange.from.valueOf();
  const to = data.timeRange.to.valueOf();
  const dT = to - from;
  const tToX = (t: number): number => ((t - from) / dT) * width;

  const valueData = data.series
    .map(series => ({ data: series.fields.find(fields => fields.type === 'number'), name: series.name || '' }))
    .filter((s): s is FieldData => s !== undefined);

  const timeData = data.series
    .map(series => series.fields.find(fields => fields.type === 'time'))
    .filter((s): s is Field<number, Vector<number>> => s !== undefined)[0]
    ?.values.toArray();

  if (!timeData) {
    return <div>no Data</div>;
  }

  const availableHeight = options.description ? height - 20 : height;
  const rowHeight = availableHeight / valueData.length - 10;
  const drawData = valueData
    .sort((a, b) => a.name.localeCompare(b.name))
    .map<DrawData>(fields => ({
      data: timeData.map(tToX).map<SectionData>((x, idxT, timeArray) => ({
        x,
        color: getColor(fields.data.values.get(idxT)),
        value: fields.data.values.get(idxT),
        width: (timeArray[idxT + 1] || tToX(Date.now())) - x,
      })),
      name: fields.name,
    }));

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
      <div>
        {drawData.map(({ data, name }) => (
          <div style={{ display: 'flex', marginBottom: 10 }}>
            {showName && (
              <div
                className={css`
                  flex: 0 0 ${namesWidth || 120}px;
                  align-self: center;
                `}
              >
                {name}
              </div>
            )}
            <ColorBar data={data} height={rowHeight} width={width - (showName ? namesWidth || 120 : 0)} />
          </div>
        ))}
      </div>
      {options.description && (
        <div className={styles.textBox}>
          <div> {options.description}</div>
        </div>
      )}
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
      padding: 0px;
    `,
  };
});
