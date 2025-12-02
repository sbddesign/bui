import dataset from './generated/components-data.js';
import type { ComponentDataset, ComponentMeta } from './types.js';

const typedDataset = dataset as unknown as ComponentDataset;

const componentsByKey = new Map<string, ComponentMeta>();

for (const component of typedDataset.components) {
  addKeys(component.name, component);
  addKeys(component.tagName, component);
}

function addKeys(key: string, component: ComponentMeta) {
  const normalized = normalizeKey(key);
  componentsByKey.set(normalized, component);
  const withoutPrefix = key.startsWith('bui-') ? key.slice(4) : key;
  if (withoutPrefix !== key) {
    componentsByKey.set(normalizeKey(withoutPrefix), component);
  }
}

function normalizeKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '-');
}

export function listComponents(): ComponentMeta[] {
  return typedDataset.components;
}

export function findComponent(identifier: string): ComponentMeta | undefined {
  return componentsByKey.get(normalizeKey(identifier));
}

export function getDatasetMetadata() {
  return {
    generatedAt: typedDataset.generatedAt,
    totalComponents: typedDataset.components.length,
  };
}
