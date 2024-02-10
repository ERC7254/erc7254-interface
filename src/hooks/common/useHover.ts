// import {
//   HTMLAttributes,
//   RefObject,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// export interface HoverEvent {
//   type: "hoverstart" | "hoverend";
//   pointerType: "mouse" | "pen";
//   target: HTMLElement;
// }

// export interface HoverEvents {
//   onHoverStart?: (e: HoverEvent) => void;
//   onHoverEnd?: (e: HoverEvent) => void;
//   onHoverChange?: (isHovering: boolean) => void;
// }

// export interface HoverProps extends HoverEvents {
//   isDisabled?: boolean;
//   isHovered?: boolean;
// }

// export interface HoverHookProps extends HoverProps {
//   ref?: RefObject<HTMLElement>;
// }

// interface HoverResult {
//   hoverProps: HTMLAttributes<HTMLElement>;
//   isHovered: boolean;
// }

// export function useHover({
//   onHoverStart,
//   onHoverChange,
//   onHoverEnd,
//   isDisabled,
//   isHovered: isHoveredProp,
// }: HoverProps): HoverResult {
//   const [isHovered, setHovered] = useState(false);
//   const state = useRef({
//     isHovered: false,
//     ignoreEmulatedMouseEvents: false,
//   }).current;

//   const hoverProps = useMemo(() => {
//     const triggerHoverStart = (
//       event,
//       pointerType: "mouse" | "pen" | "touch",
//     ) => {
//       if (isDisabled || pointerType === "touch" || state.isHovered) {
//         return;
//       }

//       state.isHovered = true;
//       const target = event.target;

//       if (onHoverStart) {
//         onHoverStart({
//           type: "hoverstart",
//           target,
//           pointerType,
//         });
//       }

//       if (onHoverChange) {
//         onHoverChange(true);
//       }

//       setHovered(true);
//     };
//     const triggerHoverEnd = (event, pointerType: "mouse" | "pen" | "touch") => {
//       if (isDisabled || pointerType === "touch" || !state.isHovered) {
//         return;
//       }

//       state.isHovered = false;
//       const target = event.target;

//       if (onHoverEnd) {
//         onHoverEnd({
//           type: "hoverend",
//           target,
//           pointerType,
//         });
//       }

//       if (onHoverChange) {
//         onHoverChange(false);
//       }

//       setHovered(false);
//     };

//     const hoverProps: HTMLAttributes<HTMLElement> = {};

//     if (typeof PointerEvent !== "undefined") {
//       hoverProps.onPointerEnter = (e) => {
//         triggerHoverStart(e, e.pointerType);
//       };

//       hoverProps.onPointerLeave = (e) => {
//         triggerHoverEnd(e, e.pointerType);
//       };
//     } else {
//       hoverProps.onTouchStart = () => {
//         state.ignoreEmulatedMouseEvents = true;
//       };

//       hoverProps.onMouseEnter = (e) => {
//         if (!state.ignoreEmulatedMouseEvents) {
//           triggerHoverStart(e, "mouse");
//         }

//         state.ignoreEmulatedMouseEvents = false;
//       };

//       hoverProps.onMouseLeave = (e) => {
//         triggerHoverEnd(e, "mouse");
//       };
//     }
//     return hoverProps;
//   }, [onHoverStart, onHoverChange, onHoverEnd, isDisabled, state]);

//   return {
//     hoverProps,
//     isHovered: isHoveredProp || isHovered,
//   };
// }
