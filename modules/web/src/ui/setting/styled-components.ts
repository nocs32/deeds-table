import { SegmentGroup } from '@ark-ui/react/segment-group';
import { Slider } from '@ark-ui/react/slider';
import { Switch } from '@ark-ui/react/switch';
import { styled } from 'styled-system/jsx';

// A setting's label, value and hint: the same on the room's panels and on printed cards.
export const SettingHead = styled('div', {
  base: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px' },
});

export const SettingLabel = styled('label', {
  base: { fontSize: '16px', fontWeight: '800' },
});

export const SettingValue = styled('span', {
  base: { fontFamily: 'display', fontSize: '16px', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' },
  variants: {
    surface: {
      room: { color: 'accent.text' },
      print: { color: 'stamp.deep' },
    },
  },
});

export const SettingHint = styled('span', {
  base: { fontSize: '12.5px', lineHeight: '1.4', '@media (max-height: 540px)': { fontSize: '13.5px' } },
  variants: {
    surface: {
      room: { color: 'fg.subtle' },
      print: { color: 'print.muted' },
    },
  },
});

export const SettingSliderRoot = styled(Slider.Root, {
  base: { display: 'grid', gap: '8px', '&[data-disabled]': { opacity: '0.5' } },
});

export const SettingSliderControl = styled(Slider.Control, {
  base: { position: 'relative', display: 'flex', alignItems: 'center', height: '24px' },
});

// An inked rule with ticks under it, like a printed scale.
export const SettingSliderTrack = styled(Slider.Track, {
  base: {
    flex: '1',
    height: '6px',
    borderRadius: '3px',
    overflow: 'hidden',
    border: '1.5px solid',
  },
  variants: {
    surface: {
      room: { bg: 'fog.deep', borderColor: 'border.strong' },
      print: { bg: 'paper.aged', borderColor: 'paper.ink' },
    },
  },
});

export const SettingSliderRange = styled(Slider.Range, {
  base: { height: '100%', bg: 'stamp.base' },
});

// The handle: a gold sovereign with a milled edge.
export const SettingSliderThumb = styled(Slider.Thumb, {
  base: {
    width: '24px',
    height: '24px',
    borderRadius: 'full',
    bg: 'gold.base',
    bgImage: 'radial-gradient(circle at 36% 32%, {colors.gold.light} 0 3px, transparent 7px), radial-gradient(circle, transparent 0 7.5px, rgba(43, 36, 32, 0.35) 8px 8.6px, transparent 9px)',
    border: '2px solid',
    borderColor: 'paper.ink',
    boxShadow: '0 0 0 2px {colors.paper.card}, 0 2px 6px rgba(0, 0, 0, 0.35)',
    cursor: 'grab',
    transition: 'transform 0.2s cubic-bezier(0.3, 1.4, 0.5, 1)',
    _hover: { transform: 'scale(1.08)' },
    _active: { cursor: 'grabbing', transform: 'scale(1.12)' },
    _focusVisible: { outline: '3px solid', outlineColor: 'accent.ring', outlineOffset: '3px' },
  },
});

export const SettingSwitchRoot = styled(Switch.Root, {
  base: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', cursor: 'pointer', '&[data-disabled]': { cursor: 'not-allowed', opacity: '0.55' } },
});

export const SettingSwitchText = styled('span', {
  base: { display: 'grid', gap: '2px', minWidth: '0' },
});

// Ark's own label part: the switch is already a <label>, and labels can't nest.
export const SettingSwitchLabel = styled(Switch.Label, {
  base: { fontSize: '16px', fontWeight: '800' },
});

// A toggle inked on the card: a lawn-green slot when it's on.
export const SettingSwitchControl = styled(Switch.Control, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: '0',
    width: '44px',
    height: '24px',
    padding: '2px',
    borderRadius: 'full',
    border: '2px solid',
    transition: 'background-color 0.15s ease',
    '&[data-state=checked]': { bg: 'lawn.base' },
    '&[data-focus-visible]': { outline: '3px solid', outlineColor: 'accent.ring', outlineOffset: '2px' },
  },
  variants: {
    surface: {
      room: { bg: 'fog.deep', borderColor: 'border.strong' },
      print: { bg: 'paper.aged', borderColor: 'paper.ink' },
    },
  },
});

export const SettingSwitchThumb = styled(Switch.Thumb, {
  base: {
    width: '16px',
    height: '16px',
    borderRadius: 'full',
    bg: 'paper.ink',
    transition: 'transform 0.15s cubic-bezier(0.3, 1.4, 0.5, 1), background-color 0.15s ease',
    '&[data-state=checked]': { transform: 'translateX(20px)', bg: 'paper.card', boxShadow: '0 0 0 1.5px {colors.paper.ink}' },
  },
});

export const SettingChoiceRoot = styled(SegmentGroup.Root, {
  base: { display: 'grid', gap: '8px', '&[data-disabled]': { opacity: '0.55' } },
});

// The options side by side in one inked strip, like a printed timetable's columns.
export const SettingChoiceOptions = styled('div', {
  base: {
    position: 'relative',
    display: 'grid',
    gridAutoColumns: 'minmax(0, 1fr)',
    gridAutoFlow: 'column',
    padding: '2px',
    borderRadius: '5px',
    border: '1.5px solid',
  },
  variants: {
    surface: {
      room: { bg: 'fog.deep', borderColor: 'border.strong' },
      print: { bg: 'paper.aged', borderColor: 'paper.ink' },
    },
  },
});

// The picked option's slip of ink, sliding to whichever is picked (Ark places it).
export const SettingChoiceIndicator = styled(SegmentGroup.Indicator, {
  base: { width: 'var(--width)', height: 'var(--height)', borderRadius: '3px', bg: 'paper.ink', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25)' },
});

export const SettingChoiceItem = styled(SegmentGroup.Item, {
  base: {
    position: 'relative',
    zIndex: '1',
    display: 'grid',
    placeItems: 'center',
    minHeight: '32px',
    paddingInline: '6px',
    borderRadius: '3px',
    fontSize: '15px',
    fontWeight: '800',
    lineHeight: '1.1',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'color 0.15s ease',
    _hover: { bg: 'print.hover' },
    '&[data-state=checked]': { color: 'paper.card', _hover: { bg: 'transparent' } },
    '&[data-disabled]': { cursor: 'not-allowed' },
    '&[data-focus-visible]': { outline: '3px solid', outlineColor: 'accent.ring', outlineOffset: '2px' },
    '@media (max-height: 540px)': { minHeight: '30px' },
  },
});
