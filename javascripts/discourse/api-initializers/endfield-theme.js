import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.11", (api) => {
  console.log("Endfield Theme: Core Systems Online");

  // ============================================
  // 1. 终末地垂直加载动画：下落满血 -> 橙屏闪切 -> 界面淡入
  // ============================================
  const dismissLoader = () => {
    const loader = document.getElementById('endfield-loader');
    if (loader && !loader.dataset.dismissed) {
      loader.dataset.dismissed = "true"; 
      
      // 停止随机跳动
      if (window.__efLoaderInterval) clearInterval(window.__efLoaderInterval);
      
      const bar = document.getElementById('ef-bar');
      const pctBox = document.getElementById('ef-pct-box');
      const pctText = document.getElementById('ef-pct');
      const orangeFlash = document.getElementById('ef-orange-flash');
      
      // 阶段 1: 强制加载到底部 100%
      if (bar) bar.style.height = '100%';
      if (pctBox) pctBox.style.top = '100%';
      if (pctText) pctText.innerText = '100%';

      // 阶段 2: 延迟极短时间后，触发全屏橙色闪变
      setTimeout(() => {
        if (orangeFlash) {
          orangeFlash.style.opacity = '1';
        }
        
        // 阶段 3: 整体淡出，销毁节点
        setTimeout(() => {
          loader.style.opacity = '0';
          loader.style.pointerEvents = 'none';
          setTimeout(() => loader.remove(), 600);
        }, 300); // 橙色屏幕停留极短时间
        
      }, 150); // 100% 状态停留 0.15 秒
    }
  };

  // 监听路由改变，一旦页面准备好就结束加载
  api.onPageChange(() => {
    dismissLoader();
  });
  
  // 兜底保护：网络卡顿时，最长等待 3.5 秒强制进站
  setTimeout(dismissLoader, 3500);

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
