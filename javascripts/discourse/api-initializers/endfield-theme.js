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
    // 使用 requestAnimationFrame 确保在下一帧渲染时执行，避免找不到元素
    requestAnimationFrame(() => {
      const content = document.querySelector('.d-header');
      if (content) {
        // 简单的入场动画
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

  // ============================================
  // 自定义装饰器 (decorateCooked)
  // ============================================
  api.decorateCooked(
    (elem) => {
      // 🛠️ 【核心修复点】
      // elem 是一个 jQuery 对象，没有 querySelectorAll 方法。
      // 我们通过 elem[0] 获取它包裹的原生 DOM 元素。
      const domNode = elem.jquery ? elem[0] : elem;

      // 防御性编程：如果节点不存在，直接返回
      if (!domNode) return;

      // 现在可以使用原生 DOM API 了
      const paragraphs = domNode.querySelectorAll('p');
      paragraphs.forEach((p) => {
        p.style.transition = 'all 0.3s ease';
      });
    },
    { onlyStream: true }
  );
});
