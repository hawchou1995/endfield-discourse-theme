import { apiInitializer } from "discourse/lib/api";
import EndfieldNewTopicButton from "../components/endfield-new-topic-button";

export default apiInitializer("1.0", (api) => {
  // 确保用户登录
  if (api.getCurrentUser()) {
    // 渲染到侧边栏导航列表的正上方，这个位置在侧边栏内部
    api.renderInOutlet("above-sidebar-sections", EndfieldNewTopicButton);
  }
});
