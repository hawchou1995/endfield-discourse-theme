import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  // 回归最稳健的方案：直接渲染在侧边栏内部最顶端
  // 这个插槽绝对存在，只要侧边栏打开
  if (api.getCurrentUser()) {
    api.renderInOutlet("above-sidebar-sections", EndfieldNewTopicButton);
  }
});
