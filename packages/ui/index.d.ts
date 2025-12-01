/* eslint-disable @typescript-eslint/no-empty-object-type */

type AmountOptionTileElement = import('./amount-option-tile.js').BuiAmountOptionTile;
type AvatarElement = import('./avatar.js').BuiAvatar;
type BitcoinQrDisplayElement = import('./bitcoin-qr-display.js').BuiBitcoinQrDisplay;
type BitcoinValueElement = import('./bitcoin-value.js').BuiBitcoinValue;
type ButtonClusterElement = import('./button-cluster.js').BuiButtonCluster;
type ButtonElement = import('./button.js').BuiButton;
type InputElement = import('./input.js').BuiInput;
type MessageElement = import('./message.js').BuiMessage;
type MoneyValueElement = import('./money-value.js').BuiMoneyValue;
type NumpadButtonElement = import('./numpad-button.js').BuiNumpadButton;
type NumpadElement = import('./numpad.js').BuiNumpad;
type OptionDotElement = import('./option-dot.js').BuiOptionDot;
type ToggleElement = import('./toggle.js').BuiToggle;

type BuiElementTagNameMap = {
  'bui-amount-option-tile': AmountOptionTileElement;
  'bui-avatar': AvatarElement;
  'bui-bitcoin-qr-display': BitcoinQrDisplayElement;
  'bui-bitcoin-value': BitcoinValueElement;
  'bui-button-cluster': ButtonClusterElement;
  'bui-button': ButtonElement;
  'bui-input': InputElement;
  'bui-message': MessageElement;
  'bui-money-value': MoneyValueElement;
  'bui-numpad-button': NumpadButtonElement;
  'bui-numpad': NumpadElement;
  'bui-option-dot': OptionDotElement;
  'bui-toggle': ToggleElement;
};

type BuiSvelteIntrinsicElements = {
  [Tag in keyof BuiElementTagNameMap]: Partial<BuiElementTagNameMap[Tag]> & Record<string, unknown>;
};

declare global {
  interface HTMLElementTagNameMap extends BuiElementTagNameMap {}
  interface ElementTagNameMap extends BuiElementTagNameMap {}

  namespace svelteHTML {
    interface IntrinsicElements extends BuiSvelteIntrinsicElements {}
  }
}

export type { BuiAmountOptionTile } from './amount-option-tile.js';
export type { BuiAvatar } from './avatar.js';
export type { BuiBitcoinQrDisplay } from './bitcoin-qr-display.js';
export type { BuiBitcoinValue } from './bitcoin-value.js';
export type { BuiButtonCluster } from './button-cluster.js';
export type { BuiButton } from './button.js';
export type { BuiInput } from './input.js';
export type { BuiMessage } from './message.js';
export type { BuiMoneyValue } from './money-value.js';
export type { BuiNumpadButton } from './numpad-button.js';
export type { BuiNumpad } from './numpad.js';
export type { BuiOptionDot } from './option-dot.js';
export type { BuiToggle } from './toggle.js';

export {};
