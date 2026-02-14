import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.11", (api) => {
  console.log("Endfield Theme: Core Systems Online");

  // ============================================
  // 1. 终末地进度条：加载完成并淡出
  // ============================================
  const dismissLoader = () => {
    const loader = document.getElementById('endfield-loader');
    if (loader && !loader.dataset.dismissed) {
      loader.dataset.dismissed = "true"; // 防止重复执行
      
      // 停止数字跳动
      if (window.__efLoaderInterval) clearInterval(window.__efLoaderInterval);
      
      const bar = document.getElementById('ef-bar');
      const pctText = document.getElementById('ef-pct');
      const textEl = document.getElementById('ef-text');
      
      // 强制满载
      if (bar) bar.style.width = '100%';
      if (pctText) pctText.innerText = '100%';
      if (textEl) textEl.innerText = 'LINK ESTABLISHED';

      // 延迟淡出，让用户能看清 100%
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none'; // 防止遮挡鼠标点击
        setTimeout(() => loader.remove(), 600); // 彻底移除 DOM
      }, 400); 
    }
  };

  // 监听路由改变，一旦页面准备好就移除加载屏
  api.onPageChange(() => {
    dismissLoader();
  });
  
  // 兜底保护：防止由于某些原因事件没触发导致永远卡住
  setTimeout(dismissLoader, 2000);

  // ============================================
  // 2. 页面加载动画 (Header Slide-in)
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

  api.onPageChange((url) => {
    playHeaderAnimation();
  });
});
