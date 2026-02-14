import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.11", (api) => {
  console.log("Endfield Theme: Core Systems Online");

  // ============================================
  // 1. 终末地加载动画：通知组件开始退场
  // ============================================
  const dismissLoader = () => {
    // 呼叫全局方法，让进度条加速跑到 100% 后自行销毁
    if (typeof window.efFinishLoading === 'function') {
      window.efFinishLoading();
    } else {
      // 兜底：如果函数不存在，强行移除以防卡死
      const loader = document.getElementById('endfield-loader');
      if (loader) loader.remove();
    }
  };

  // 监听路由改变，一旦页面数据准备好，就通知进度条
  api.onPageChange(() => {
    dismissLoader();
  });
  
  // 兜底保护：网络极端卡顿，最长等待 4.5 秒强制进站
  setTimeout(dismissLoader, 4500);

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
