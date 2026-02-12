import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  console.log("Endfield Theme: Core Systems Online");

  // ============================================
  // 1. 页面加载动画 (Header Slide-in)
  // ============================================
  const playHeaderAnimation = () => {
    requestAnimationFrame(() => {
      const header = document.querySelector('.d-header');
      if (header) {
        header.style.transition = 'none';
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        void header.offsetWidth;
        header.style.transition = 'all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
      }
    });
  };

  // ============================================
  // 2. 全局调度
  // ============================================
  api.onPageChange((url) => {
    playHeaderAnimation();
  });
});
