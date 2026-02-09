import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  // 控制台日志：验证新代码是否生效
  console.log("Endfield Theme: Core Systems Online (v2.6 Clean)");

  // ============================================
  // 1. 页面加载动画 (Header Slide-in)
  // ============================================
  const playHeaderAnimation = () => {
    requestAnimationFrame(() => {
      const header = document.querySelector('.d-header');
      if (header) {
        // 重置状态以支持页面切换时的重复播放
        header.style.transition = 'none';
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        
        // 强制重绘
        void header.offsetWidth;

        // 播放动画
        header.style.transition = 'all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
      }
    });
  };

  // ============================================
  // 2. 全局调度 (Scheduler)
  // ============================================
  api.onPageChange((url) => {
    playHeaderAnimation();
  });
});
