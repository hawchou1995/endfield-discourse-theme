import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.11", (api) => {
  console.log("Endfield Theme: Core Systems Online");

  // ============================================
  // 1. 终末地加载动画：进度满 -> 橙色闪屏 -> 淡出
  // ============================================
  const dismissLoader = () => {
    const loader = document.getElementById('endfield-loader');
    if (loader && !loader.dataset.dismissed) {
      loader.dataset.dismissed = "true"; 
      
      if (window.__efLoaderInterval) clearInterval(window.__efLoaderInterval);
      
      const bar = document.getElementById('ef-bar');
      const pctText = document.getElementById('ef-pct');
      const textEl = document.getElementById('ef-text');
      const orangeFlash = document.getElementById('ef-orange-flash');
      
      // 阶段 1: 强制加载到 100%
      if (bar) bar.style.width = '100%';
      if (pctText) pctText.innerText = '100%';
      if (textEl) textEl.innerText = 'SYSTEM READY';

      // 阶段 2: 触发橙色闪屏 (延迟一下让 100% 的视觉停留一瞬间)
      setTimeout(() => {
        if (orangeFlash) {
          orangeFlash.style.opacity = '1'; // 瞬间全屏变橙色
        }
        
        // 阶段 3: 整体淡出，露出真正的论坛页面
        setTimeout(() => {
          loader.style.opacity = '0';
          loader.style.pointerEvents = 'none';
          
          setTimeout(() => loader.remove(), 600); // 彻底销毁
        }, 400); // 橙色屏幕停留 0.4 秒
        
      }, 150); // 100% 进度条停留 0.15 秒
    }
  };

  // 监听路由改变，一旦页面准备好就移除加载屏
  api.onPageChange(() => {
    dismissLoader();
  });
  
  // 兜底保护：防止由于网络问题卡死，强制 3 秒后执行退场
  setTimeout(dismissLoader, 3000);

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
