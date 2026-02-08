import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  console.log("Endfield Theme initialized");

  // 页面加载动画逻辑
  const addPageLoadAnimation = () => {
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

  // 监听页面切换
  api.onPageChange((url) => {
    // console.log("Endfield Theme: Page changed to", url); // 可选：关闭详细日志
    addPageLoadAnimation();
  });

  // 自定义装饰器
  api.decorateCooked(
    (elem) => {
      const domNode = elem.jquery ? elem[0] : elem;
      if (!domNode) return;

      const paragraphs = domNode.querySelectorAll('p');
      paragraphs.forEach((p) => {
        p.style.transition = 'all 0.3s ease';
      });
    },
    { onlyStream: true }
  );
});
