import { untrack } from "svelte";
import { computePosition } from "@floating-ui/dom";
import type {
  FloatingElement,
  MiddlewareData,
  Placement,
  ReferenceElement,
  Strategy,
} from "@floating-ui/dom";

import type { CreateFloatingOptions, CreateFloatingReturn } from "./types.js";
import { roundByDPR } from "./utils/roundByDPR.js";
import { getDPR } from "./utils/getDPR.js";

export function createFloating<T extends ReferenceElement = ReferenceElement>(
  options: CreateFloatingOptions = {}
): CreateFloatingReturn<T> {
  let reference = $state<T | null>(null);
  let floating = $state<FloatingElement | null>(null);
  let x = $state(0);
  let y = $state(0);
  let placement = $state<Placement>(options.placement ?? "bottom");
  let strategy = $state<Strategy>(options.strategy ?? "absolute");
  let middlewareData = $state.frozen<MiddlewareData>({});
  let isPositioned = $state(false);
  const floatingStyles = $derived(updateFloatingStyles());

  function updateFloatingStyles() {
    const initialStyles = {
      position: strategy,
      left: "0",
      top: "0",
    };
    if (!floating) return initialStyles;

    const xVal = roundByDPR(floating, x);
    const yVal = roundByDPR(floating, y);

    if (options.transform) {
      return {
        ...initialStyles,
        transform: `translate(${xVal}px, ${yVal}px)`,
        ...(getDPR(floating) >= 1.5 && { willChange: "transform" }),
      };
    }

    return {
      position: strategy,
      left: `${xVal}px`,
      top: `${yVal}px`,
    };
  }

  function update() {
    if (reference === null || floating === null) return;

    computePosition(reference, floating, {
      middleware: options.middleware,
      placement: options.placement,
      strategy: options.strategy,
    }).then((position) => {
      x = position.x;
      y = position.y;
      strategy = position.strategy;
      placement = position.placement;
      middlewareData = position.middlewareData;
      isPositioned = true;
    });
  }

  let whileElementsMountedCleanup: (() => void) | undefined;

  function cleanup() {
    if (typeof whileElementsMountedCleanup === "function") {
      whileElementsMountedCleanup();
      whileElementsMountedCleanup = undefined;
    }
  }

  function attach() {
    cleanup();

    if (options.whileElementsMounted === undefined) {
      update();
      return;
    }

    if (reference !== null && floating !== null) {
      whileElementsMountedCleanup = options.whileElementsMounted(
        reference,
        floating,
        update
      );
      return;
    }
  }

  function reset() {
    if (options.open) {
      isPositioned = false;
    }
  }

  $effect(() => {
    options.placement;
    options.strategy;
    options.middleware;
    untrack(() => update());
  });

  $effect(() => {
    options.open;
    untrack(() => reset());
  });

  $effect(() => {
    reference;
    floating;
    untrack(() => {
      attach();
    });
  });

  return {
    get x() {
      return x;
    },
    get y() {
      return y;
    },
    get placement() {
      return placement;
    },
    get strategy() {
      return strategy;
    },
    get middlewareData() {
      return middlewareData;
    },
    get isPositioned() {
      return isPositioned;
    },
    get floatingStyles() {
      return floatingStyles;
    },
    update,
    get reference() {
      return reference;
    },
    set reference(ref) {
      reference = ref;
    },
    get floating() {
      return floating;
    },
    set floating(ref) {
      floating = ref;
    },
  };
}
