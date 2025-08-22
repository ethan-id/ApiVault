import type { Ref } from 'vue';
import { watch } from 'vue';
import { useState } from 'nuxt/app';

export function useApiFilter(): { filter: Ref<string> } {
  const filter = useState<string>('apiFilter', () => 'name');

  if (process.client) {
    const stored = localStorage.getItem('apiFilter');
    if (stored && stored !== filter.value) {
      filter.value = stored;
    }

    watch(
      filter,
      (newValue) => {
        localStorage.setItem('apiFilter', newValue);
      },
      { immediate: false }
    );
  }

  return { filter };
}


