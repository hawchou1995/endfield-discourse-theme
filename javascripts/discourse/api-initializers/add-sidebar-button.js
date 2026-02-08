import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  // Glacier/Horizon 核心逻辑：
  // 使用 before-sidebar-columns 插槽，将按钮注入到页面主网格结构中
  if (api.getCurrentUser()) {
    api.renderInOutlet("before-sidebar-columns", EndfieldNewTopicButton);
  }
});
