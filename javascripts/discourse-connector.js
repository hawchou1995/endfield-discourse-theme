
// ============================================
// 《明日方舟·终末地》Discourse主题 - JavaScript功能
// ============================================

import { api } from "discourse/lib/api";

// ============================================
// 主题初始化
// ============================================

api.onPageChange((url, title) => {
  console.log("Endfield Theme: Page changed to", url);
  
  // 添加页面加载动画
  addPageLoadAnimation();
});

// ============================================
// 页面加载动画
// ============================================

function addPageLoadAnimation() {
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
}

// ============================================
// 自定义装饰器
// ============================================

api.decorateCooked(
  (elem) => {
    // 添加自定义装饰效果
    const paragraphs = elem.querySelectorAll('p');
    paragraphs.forEach((p) => {
      p.style.transition = 'all 0.3s ease';
    });
  },
  { onlyStream: true }
);

// ============================================
// 导出API
// ============================================

export default {
  name: "endfield-theme",
  initialize() {
    console.log("Endfield Theme initialized");
  }
};
