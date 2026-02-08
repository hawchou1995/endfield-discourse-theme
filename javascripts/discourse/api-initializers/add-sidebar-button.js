import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  // 仅在显示侧边栏时加载
  if (!api.getCurrentUser()) return;

  // 将按钮渲染到侧边栏内容的最上方
  // 使用 "above-main-container" 可能太高了，试用 "before-sidebar-sections"
  // 如果 "before-sidebar-sections" 不起作用，我们可以尝试 "sidebar-navigation" 相关的 outlet
  // 但目前最稳妥的是渲染在侧边栏内部顶部，然后用 CSS 提上去
  api.renderInOutlet("before-sidebar-sections", EndfieldNewTopicButton);
});
