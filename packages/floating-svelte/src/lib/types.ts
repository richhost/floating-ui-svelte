import type {
	FloatingElement,
	Middleware,
	MiddlewareData,
	Padding,
	Placement,
	ReferenceElement,
	Strategy
} from '@floating-ui/dom';

export type {
	AlignedPlacement,
	Alignment,
	AutoPlacementOptions,
	AutoUpdateOptions,
	Axis,
	Boundary,
	ClientRectObject,
	ComputePositionConfig,
	ComputePositionReturn,
	Coords,
	DetectOverflowOptions,
	Dimensions,
	ElementContext,
	ElementRects,
	Elements,
	FlipOptions,
	FloatingElement,
	HideOptions,
	InlineOptions,
	Length,
	Middleware,
	MiddlewareArguments,
	MiddlewareData,
	MiddlewareReturn,
	MiddlewareState,
	NodeScroll,
	OffsetOptions,
	Padding,
	Placement,
	Platform,
	Rect,
	ReferenceElement,
	RootBoundary,
	ShiftOptions,
	Side,
	SideObject,
	SizeOptions,
	Strategy,
	VirtualElement
} from '@floating-ui/dom';

export type CreateFloatingOptions<T extends ReferenceElement = ReferenceElement> = {
	/**
	 * Represents the open/close state of the floating element.
	 * @default true
	 */
	open?: boolean | undefined;
	/**
	 * Where to place the floating element relative to its reference element.
	 * @default 'bottom'
	 */
	placement?: Placement | undefined;
	/**
	 * The type of CSS position property to use.
	 * @default 'absolute'
	 */
	strategy?: Strategy | undefined;
	/**
	 * These are plain objects that modify the positioning coordinates in some fashion, or provide useful data for the consumer to use.
	 * @default undefined
	 */
	middleware?: Middleware[] | undefined;
	/**
	 * Whether to use `transform` instead of `top` and `left` styles to
	 * position the floating element (`floatingStyles`).
	 * @default true
	 */
	transform?: boolean | undefined;
	/**
	 * Callback to handle mounting/unmounting of the elements.
	 * @default undefined
	 */
	whileElementsMounted?: (
		reference: T,
		floating: FloatingElement,
		update: () => void
	) => () => void;
};

export type CreateFloatingReturn<T extends ReferenceElement = ReferenceElement> = {
	/**
	 * The x-coord of the floating element.
	 */
	readonly x: number;
	/**
	 * The y-coord of the floating element.
	 */
	readonly y: number;
	/**
	 * The stateful placement, which can be different from the initial `placement` passed as options.
	 */
	readonly placement: Placement;
	/**
	 * The type of CSS position property to use.
	 */
	readonly strategy: Strategy;
	/**
	 * Additional data from middleware.
	 */
	readonly middlewareData: MiddlewareData;
	/**
	 * The boolean that let you know if the floating element has been positioned.
	 */
	readonly isPositioned: boolean;
	/**
	 * CSS styles to apply to the floating element to position it.
	 */
	readonly floatingStyles: {
		position: Strategy;
		top: string;
		left: string;
		transform?: string;
		willChange?: string;
	};
	/**
	 * The function to update floating position manually.
	 */
	update: () => void;

	reference: T | null;

	floating: HTMLElement | null;
};

export type ArrowOptions = {
	/**
	 * The arrow element or template ref to be positioned.
	 * @required
	 */
	element: Element;
	/**
	 * The padding between the arrow element and the floating element edges. Useful when the floating element has rounded corners.
	 * @default 0
	 */
	padding?: Padding;
};
