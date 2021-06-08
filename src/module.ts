import { PanelPlugin } from '@grafana/data';
import { ColorThresholds, defaultColorThreshold, BarOptions } from './types';
import { StatusBarPanel } from './StatusBarPanel';
import { ColorEditor } from './ColorEditor';

export const plugin = new PanelPlugin<BarOptions>(StatusBarPanel).setPanelOptions(builder =>
  builder
    .addCustomEditor<BarOptions, ColorThresholds>({
      id: 'colors',
      path: 'colors',
      name: 'Color Threshold',
      editor: ColorEditor,
      defaultValue: [defaultColorThreshold] as ColorThresholds,
      description: 'Thresholds to set color of section',
    })
    .addColorPicker({
      name: 'Default Color',
      path: 'defaultColor',
      description: 'color when no threshold is reached',
      defaultValue: '#aaaaaa',
    })
    .addBooleanSwitch({
      path: 'showName',
      name: 'Show Names',
      description: 'Show the name of each bar',
    })
    .addNumberInput({
      path: 'namesWidth',
      name: 'Name width',
      description: 'Empty space for the names',
      showIf: c => c.showName,
    })
    .addTextInput({
      path: 'description',
      name: 'Description',
      description: 'Description of panel option',
    })
);
