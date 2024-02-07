import NProgress from "nprogress";

export function onStart(): void {
  NProgress.start();
}

export function onComplete(): void {
  NProgress.done();
}
