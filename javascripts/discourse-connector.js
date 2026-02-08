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
  };

  // ============================================
  // 监听页面切换
  // ============================================
  api.onPageChange((url, title) => {
    console.log("Endfield Theme: Page changed to", url);
    addPageLoadAnimation();
  });

  // ============================================
  // 自定义装饰器 (decorateCooked)
  // ============================================
  api.decorateCooked(
    (elem) => {
      // 给帖子内容的段落添加过渡效果
      const paragraphs = elem.querySelectorAll('p');
      paragraphs.forEach((p) => {
        p.style.transition = 'all 0.3s ease';
      });
    },
    { onlyStream: true }
  );
});
