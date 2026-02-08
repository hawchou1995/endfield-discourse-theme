import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  // 仅在显示侧边栏时加载
  if (!api.getCurrentUser()) return;

  // 将按钮渲染到侧边栏内容的最上方
  // "above-sidebar-sections" 是 Discourse 官方侧边栏的一个插件插槽
  api.renderInOutlet("above-sidebar-sections", EndfieldNewTopicButton);
});
