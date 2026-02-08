import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  if (!api.getCurrentUser()) return;

  // 使用 before-sidebar-columns，这是放置在整个侧边栏区域最上方（包括导航）的最佳位置
  // 它位于 sidebar-wrapper 内部，sidebar-navigation 之前
  api.renderInOutlet("before-sidebar-columns", EndfieldNewTopicButton);
});
