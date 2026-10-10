import { SegmentGroup } from '@ark-ui/react/segment-group';
import type { ReactElement } from 'react';
import { SettingChoiceIndicator, SettingChoiceItem, SettingChoiceOptions, SettingChoiceRoot, SettingHint, SettingLabel } from './styled-components';

interface SettingChoiceOption {
  id: string;
  label: string;
}

interface SettingChoiceProps {
  label: string;
  // What the picked option does, right under it.
  hint?: string;
  options: SettingChoiceOption[];
  value: string;
  disabled?: boolean;
  surface: 'room' | 'print';
  onChange: (id: string | null) => void;
}

// One of a few options, side by side: the picked one inked in.
export function SettingChoice({ label, hint, options, value, disabled = false, surface, onChange }: SettingChoiceProps): ReactElement {
  return (
    <SettingChoiceRoot value={value} disabled={disabled} orientation="horizontal" onValueChange={(details) => onChange(details.value)}>
      <SegmentGroup.Label asChild>
        <SettingLabel>{label}</SettingLabel>
      </SegmentGroup.Label>
      <SettingChoiceOptions surface={surface}>
        <SettingChoiceIndicator />
        {options.map((option) => (
          <SettingChoiceItem key={option.id} value={option.id}>
            <SegmentGroup.ItemText>{option.label}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemHiddenInput />
          </SettingChoiceItem>
        ))}
      </SettingChoiceOptions>
      {hint && <SettingHint surface={surface}>{hint}</SettingHint>}
    </SettingChoiceRoot>
  );
}
