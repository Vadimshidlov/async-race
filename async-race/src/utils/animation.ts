// export function animateStep(
//   startAnimation: number,
//   animationTime: number,
//   element: HTMLElement,
// ): void {
//   let startAnimationTime = startAnimation;
//   const animationTarget = element;

//   if (!startAnimationTime) {
//     startAnimationTime = Date.now();
//   }
  
//   const progress = Date.now() - startAnimation;
//   const step = Math.min(progress / 10, 200);
//   // animationTarget.style.transform = 'translateX(' + Math.min(progress / 10, 200) + 'px)';
//   animationTarget.style.transform = `translateX( ${step}px)`;

//   if (progress < animationTime) {
//     window.requestAnimationFrame(() => animateStep);
//   }
// }
export function animateStep(
  startAnimation: number,
  animationTime: number,
  element: HTMLElement,
): void {
  let startAnimationTime = startAnimation;
  const animationTarget = element;

  if (!startAnimationTime) {
    startAnimationTime = Date.now();
  }
  
  const progress = Date.now() - startAnimation;
  const step = Math.min(progress / 10, 200);
  // animationTarget.style.transform = 'translateX(' + Math.min(progress / 10, 200) + 'px)';
  animationTarget.style.transform = `translateX( ${step}px)`;

  if (progress < animationTime) {
    window.requestAnimationFrame(() => animateStep);
  }
}
