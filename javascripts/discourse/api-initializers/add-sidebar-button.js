import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  if (!api.getCurrentUser()) return;

  // 使用 before-sidebar-sections 确保它在所有侧边栏链接列表之前渲染
  api.renderInOutlet("before-sidebar-sections", EndfieldNewTopicButton);
});
