import React, { ComponentType } from 'react';
import {
  ColorThreshold,
  ColorThresholdOpp,
  colorThresholdOppOptions,
  ColorThresholds,
  defaultColorThreshold,
} from 'types';
import { SelectableValue, StandardEditorProps } from '@grafana/data';
import { Input, Select, ColorPicker, Label, InlineLabel, useTheme } from '@grafana/ui';

type ColorEditorProps = StandardEditorProps<ColorThresholds>;
export const ColorEditor: ComponentType<ColorEditorProps> = ({ value, onChange }) => {
  const addNew = () => {
    value.push(defaultColorThreshold);
    onChange(value);
  };
  React.useEffect(() => {
    if (value.length === 0) {
      value.push(defaultColorThreshold);
      onChange(value);
    }
  }, [value]);
  return (
    <div>
      {value.map((v, idx, array) =>
        ColorEntry({
          value: v,
          onChange: changed => {
            array[idx] = changed;
            onChange(array);
          },
        })
      )}
      <InlineLabel onClick={addNew}> Add </InlineLabel>
    </div>
  );
};

type ColorEntryProps = {
  value: ColorThreshold;
  onChange: (conf: ColorThreshold) => void;
};

export const ColorEntry = ({ value, onChange }: ColorEntryProps): JSX.Element => {
  const theme = useTheme();
  const oppOptions = colorThresholdOppOptions.map<SelectableValue<ColorThresholdOpp>>(o => ({
    label: o,
    value: o,
  }));
  return (
    <div style={{ borderWidth: 2, borderStyle: 'solid', borderColor: theme.colors.border1, padding: 6, margin: 6 }}>
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '0 0 75px', alignSelf: 'center' }}>
            <Label>Operator</Label>
          </div>
          <Select
            options={oppOptions}
            value={value.opp}
            onChange={selectableValue => onChange({ ...value, opp: selectableValue.value || '=' })}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '0 0 75px', alignSelf: 'center' }}>
            <Label>Threshold</Label>
          </div>
          <Input
            css=""
            title="value"
            value={value.value}
            onChange={ev =>
              onChange({
                ...value,
                // @ts-ignore
                value: ev.target.value,
              })
            }
          />
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '0 0 75px', alignSelf: 'center' }}>
            <Label>Color</Label>
          </div>
          <ColorPicker color={value.color} onChange={color => onChange({ ...value, color: color })} />
        </div>
      </div>
    </div>
  );
};
