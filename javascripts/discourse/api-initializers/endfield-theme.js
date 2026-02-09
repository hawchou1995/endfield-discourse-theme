import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  // ============================================
  // 主题初始化日志
  // ============================================
  console.log("Endfield Theme initialized");

  // ============================================
  // 页面加载动画逻辑
  // ============================================
  const addPageLoadAnimation = () => {
    // 使用 requestAnimationFrame 确保 DOM 已准备好
    requestAnimationFrame(() => {
      const content = document.querySelector('.d-header');
      if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(-20px)';
        content.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
          content.style.opacity = '1';
          content.style.transform = 'translateY(0)';
        }, 100);
      }
    });
  };

  // ============================================
  // 监听页面切换
  // ============================================
  api.onPageChange((url) => {
    console.log("Endfield Theme: Page changed to", url);
    addPageLoadAnimation();
  });


