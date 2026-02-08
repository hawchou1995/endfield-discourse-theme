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

  // ============================================
  // 自定义装饰器 (decorateCooked)
  // ============================================
  api.decorateCooked(
    (elem) => {
      // 🛠️ 【核心修复】兼容性处理
      // Discourse 可能会传入 jQuery 对象或原生 DOM 节点
      // 如果是 jQuery 对象 (elem.jquery 存在)，则取第一个元素转为原生节点
      const domNode = elem.jquery ? elem[0] : elem;

      // 防御性编程：如果节点无效，直接返回，防止报错
      if (!domNode) return;

      // 现在 domNode 必定是原生元素，可以安全使用 querySelectorAll
      const paragraphs = domNode.querySelectorAll('p');
      paragraphs.forEach((p) => {
        p.style.transition = 'all 0.3s ease';
      });
    },
    { onlyStream: true }
  );
});
